"""
Arcanea MCP Client v2 - Production-Ready Model Context Protocol Client
==================================================================================

Connects Arcanea Ecosystem to Nano Banana MCP Server with enterprise-grade
resilience patterns: circuit breaker, retry logic, caching, and comprehensive
error handling.

Author: Arcanea Engineering Team
Version: 2.0.0
License: MIT

Features:
    - Async HTTP client with httpx
    - Connection pooling for optimal performance
    - Circuit breaker pattern (5 failures = open circuit)
    - Exponential backoff retry (3 attempts, 4-10s delays)
    - Request caching for idempotent operations
    - Health check monitoring
    - Graceful degradation with fallbacks
    - Comprehensive logging with structured output
    - Configuration management via dataclasses

Usage:
    ```python
    config = MCPConfig(
        base_url="http://localhost:3000",
        api_key="your-api-key"
    )
    
    async with ArcaneaMCPClient(config) as client:
        if await client.health_check():
            result = await client.generate_image(
                prompt="Epic dragon",
                style="fantasy"
            )
            print(result["data"]["url"])
    ```
"""

import asyncio
import json
import logging
import time
from contextlib import asynccontextmanager
from dataclasses import dataclass, field
from datetime import datetime, timedelta
from enum import Enum
from typing import Any, Callable, Dict, List, Optional, Set, TypeVar
from functools import wraps

import httpx
from tenacity import (
    retry,
    retry_if_exception_type,
    stop_after_attempt,
    wait_exponential,
    before_sleep_log
)

# Configure structured logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger("arcanea-mcp-client")


# ============================================================================
# Configuration & Enums
# ============================================================================

class CircuitState(Enum):
    """Circuit breaker states following the standard pattern."""
    CLOSED = "closed"      # Normal operation
    OPEN = "open"          # Failing, rejecting requests
    HALF_OPEN = "half_open"  # Testing if service recovered


@dataclass
class MCPConfig:
    """
    Configuration for Arcanea MCP Client.
    
    All timeouts and retry settings are configurable for different
    deployment environments and use cases.
    
    Attributes:
        base_url: MCP server base URL (e.g., "http://localhost:3000")
        api_key: Authentication key for MCP server
        timeout: HTTP request timeout in seconds (default: 30)
        max_retries: Number of retry attempts (default: 3)
        cache_ttl: Cache time-to-live in seconds (default: 3600)
        circuit_breaker_threshold: Failures before opening circuit (default: 5)
        circuit_breaker_recovery: Seconds before half-open test (default: 30)
        max_connections: Connection pool size (default: 10)
        keepalive_expiry: Keep-alive connection expiry in seconds (default: 5)
    """
    base_url: str
    api_key: str
    timeout: float = 30.0
    max_retries: int = 3
    cache_ttl: int = 3600
    circuit_breaker_threshold: int = 5
    circuit_breaker_recovery: int = 30
    max_connections: int = 10
    keepalive_expiry: float = 5.0
    
    def __post_init__(self):
        """Validate configuration on initialization."""
        if not self.base_url:
            raise ValueError("base_url is required")
        if not self.api_key:
            raise ValueError("api_key is required")
        if self.timeout <= 0:
            raise ValueError("timeout must be positive")
        if self.max_retries < 0:
            raise ValueError("max_retries must be non-negative")


@dataclass
class CacheEntry:
    """Cache entry with metadata for TTL management."""
    data: Any
    timestamp: datetime
    hits: int = 0


# ============================================================================
# Circuit Breaker Implementation
# ============================================================================

class CircuitBreaker:
    """
    Production-grade circuit breaker pattern implementation.
    
    Automatically opens after threshold failures, rejects requests while open,
    and periodically tests recovery in half-open state.
    
    Args:
        threshold: Number of failures before opening circuit
        recovery_time: Seconds to wait before testing recovery
        name: Identifier for logging
    """
    
    def __init__(
        self,
        threshold: int = 5,
        recovery_time: int = 30,
        name: str = "default"
    ):
        self.threshold = threshold
        self.recovery_time = recovery_time
        self.name = name
        self.state = CircuitState.CLOSED
        self.failure_count = 0
        self.last_failure_time: Optional[float] = None
        self._lock = asyncio.Lock()
        
    async def call(self, func: Callable, *args, **kwargs) -> Any:
        """
        Execute function with circuit breaker protection.
        
        Args:
            func: Async function to call
            *args, **kwargs: Arguments for the function
            
        Returns:
            Function result
            
        Raises:
            CircuitBreakerOpenError: If circuit is open
            Exception: Original exception from function
        """
        async with self._lock:
            if self.state == CircuitState.OPEN:
                if await self._should_attempt_reset():
                    self.state = CircuitState.HALF_OPEN
                    logger.info(f"Circuit {self.name}: Entering HALF_OPEN state")
                else:
                    raise CircuitBreakerOpenError(
                        f"Circuit {self.name} is OPEN - rejecting request"
                    )
        
        try:
            result = await func(*args, **kwargs)
            await self._on_success()
            return result
        except Exception as e:
            await self._on_failure()
            raise
    
    async def _on_success(self) -> None:
        """Handle successful execution."""
        async with self._lock:
            if self.state == CircuitState.HALF_OPEN:
                logger.info(f"Circuit {self.name}: Service recovered, CLOSING circuit")
                self.state = CircuitState.CLOSED
                self.failure_count = 0
            else:
                self.failure_count = 0
    
    async def _on_failure(self) -> None:
        """Handle failed execution."""
        async with self._lock:
            self.failure_count += 1
            self.last_failure_time = time.time()
            
            if self.state == CircuitState.HALF_OPEN:
                logger.warning(f"Circuit {self.name}: Recovery failed, OPENING circuit")
                self.state = CircuitState.OPEN
            elif self.failure_count >= self.threshold:
                logger.error(
                    f"Circuit {self.name}: Threshold reached ({self.threshold}), "
                    f"OPENING circuit"
                )
                self.state = CircuitState.OPEN
    
    async def _should_attempt_reset(self) -> bool:
        """Check if enough time has passed to test recovery."""
        if self.last_failure_time is None:
            return True
        elapsed = time.time() - self.last_failure_time
        return elapsed >= self.recovery_time
    
    def get_state(self) -> Dict[str, Any]:
        """Get current circuit breaker state for monitoring."""
        return {
            "name": self.name,
            "state": self.state.value,
            "failure_count": self.failure_count,
            "last_failure": self.last_failure_time,
            "threshold": self.threshold,
            "recovery_time": self.recovery_time
        }


class CircuitBreakerOpenError(Exception):
    """Raised when circuit breaker is open and rejecting requests."""
    pass


# ============================================================================
# Cache Implementation
# ============================================================================

class RequestCache:
    """
    LRU-style cache for idempotent MCP operations.
    
    Provides thread-safe caching with automatic TTL expiration
    and hit rate statistics for monitoring.
    
    Args:
        ttl_seconds: Cache entry lifetime in seconds
    """
    
    def __init__(self, ttl_seconds: int = 3600):
        self.ttl = ttl_seconds
        self._cache: Dict[str, CacheEntry] = {}
        self._lock = asyncio.Lock()
        self._total_requests = 0
        self._cache_hits = 0
        
    async def get(self, key: str) -> Optional[Any]:
        """
        Retrieve cached value if valid.
        
        Args:
            key: Cache key
            
        Returns:
            Cached data or None if expired/missing
        """
        async with self._lock:
            self._total_requests += 1
            entry = self._cache.get(key)
            
            if entry is None:
                return None
            
            age = (datetime.now() - entry.timestamp).total_seconds()
            if age > self.ttl:
                del self._cache[key]
                return None
            
            entry.hits += 1
            self._cache_hits += 1
            return entry.data
    
    async def set(self, key: str, data: Any) -> None:
        """
        Store value in cache.
        
        Args:
            key: Cache key
            data: Data to cache
        """
        async with self._lock:
            self._cache[key] = CacheEntry(
                data=data,
                timestamp=datetime.now(),
                hits=0
            )
    
    async def invalidate(self, key: str) -> bool:
        """
        Remove specific key from cache.
        
        Returns:
            True if key existed and was removed
        """
        async with self._lock:
            if key in self._cache:
                del self._cache[key]
                return True
            return False
    
    async def clear(self) -> None:
        """Clear all cached entries."""
        async with self._lock:
            self._cache.clear()
    
    def get_stats(self) -> Dict[str, Any]:
        """Get cache statistics for monitoring."""
        hit_rate = 0.0
        if self._total_requests > 0:
            hit_rate = (self._cache_hits / self._total_requests) * 100
        
        return {
            "total_entries": len(self._cache),
            "total_requests": self._total_requests,
            "cache_hits": self._cache_hits,
            "hit_rate_percent": round(hit_rate, 2),
            "ttl_seconds": self.ttl
        }


# ============================================================================
# Main MCP Client
# ============================================================================

class ArcaneaMCPClient:
    """
    Production-ready Model Context Protocol client for Arcanea Ecosystem.
    
    Features enterprise-grade resilience patterns:
    - Connection pooling with httpx
    - Circuit breaker for cascading failure prevention
    - Exponential backoff retry for transient failures
    - Request caching for idempotent operations
    - Comprehensive error handling and logging
    - Health check monitoring
    - Graceful degradation with fallbacks
    
    Supports multiple MCP tools:
    - image_generation: Create images from text
    - code_analysis: Analyze code quality
    - documentation_search: Search docs
    - data_processing: Transform and process data
    
    Args:
        config: MCPConfig instance with connection parameters
        
    Example:
        ```python
        config = MCPConfig(
            base_url="http://localhost:3000",
            api_key="secret-key",
            timeout=30.0
        )
        
        async with ArcaneaMCPClient(config) as client:
            result = await client.generate_image("Epic dragon")
        ```
    """
    
    def __init__(self, config: MCPConfig):
        """Initialize MCP client with configuration."""
        self.config = config
        self._client: Optional[httpx.AsyncClient] = None
        self._circuit_breaker = CircuitBreaker(
            threshold=config.circuit_breaker_threshold,
            recovery_time=config.circuit_breaker_recovery,
            name="mcp-server"
        )
        self._cache = RequestCache(ttl_seconds=config.cache_ttl)
        self._connected = False
        self._available_tools: List[str] = []
        
        logger.info(
            f"MCP Client initialized: {config.base_url} "
            f"(timeout={config.timeout}s, retries={config.max_retries})"
        )
    
    async def __aenter__(self) -> 'ArcaneaMCPClient':
        """Async context manager entry."""
        await self.connect()
        return self
    
    async def __aexit__(self, exc_type, exc_val, exc_tb) -> None:
        """Async context manager exit with cleanup."""
        await self.close()
    
    def _get_client(self) -> httpx.AsyncClient:
        """Get or create HTTP client with connection pooling."""
        if self._client is None or self._client.is_closed:
            limits = httpx.Limits(
                max_connections=self.config.max_connections,
                max_keepalive_connections=self.config.max_connections,
                keepalive_expiry=self.config.keepalive_expiry
            )
            
            self._client = httpx.AsyncClient(
                base_url=self.config.base_url,
                timeout=httpx.Timeout(self.config.timeout),
                limits=limits,
                headers={
                    "Authorization": f"Bearer {self.config.api_key}",
                    "Content-Type": "application/json",
                    "User-Agent": "Arcanea-MCP-Client/2.0.0"
                }
            )
        
        return self._client
    
    # ====================================================================
    # Connection Management
    # ====================================================================
    
    async def connect(self) -> bool:
        """
        Initialize connection to MCP server and discover available tools.
        
        Returns:
            True if connection successful, False otherwise
        """
        try:
            logger.info(f"Connecting to MCP server at {self.config.base_url}")
            
            # Perform health check as connection test
            health = await self.health_check()
            
            if health:
                self._connected = True
                self._available_tools = await self._discover_tools()
                logger.info(
                    f"✅ Connected to MCP server. "
                    f"Available tools: {len(self._available_tools)}"
                )
                return True
            else:
                logger.error("❌ Health check failed - server may be unavailable")
                return False
                
        except Exception as e:
            logger.error(f"❌ Failed to connect to MCP server: {e}")
            return False
    
    async def _discover_tools(self) -> List[str]:
        """Discover available tools from MCP server."""
        try:
            response = await self._make_request("GET", "/mcp/tools")
            tools = response.get("tools", [])
            return [tool["name"] for tool in tools]
        except Exception as e:
            logger.warning(f"Could not discover tools: {e}")
            # Return default tools as fallback
            return [
                "image_generation",
                "code_analysis",
                "documentation_search",
                "data_processing"
            ]
    
    async def close(self) -> None:
        """
        Clean up resources and close connections.
        
        Should be called when client is no longer needed, or use
        the async context manager (async with) for automatic cleanup.
        """
        logger.info("Closing MCP client connections...")
        
        if self._client and not self._client.is_closed:
            await self._client.aclose()
        
        self._connected = False
        self._available_tools = []
        
        # Log final statistics
        cache_stats = self._cache.get_stats()
        logger.info(
            f"Client closed. Cache stats: {cache_stats['hit_rate_percent']:.1f}% hit rate, "
            f"{cache_stats['total_entries']} entries"
        )
    
    # ====================================================================
    # Core Request Method with Resilience Patterns
    # ====================================================================
    
    async def _make_request(
        self,
        method: str,
        endpoint: str,
        data: Optional[Dict] = None,
        use_cache: bool = True
    ) -> Dict[str, Any]:
        """
        Make HTTP request with retry, circuit breaker, and caching.
        
        This is the core method that implements all resilience patterns:
        1. Check cache for GET requests (if enabled)
        2. Apply circuit breaker protection
        3. Execute with exponential backoff retry
        4. Cache successful GET responses
        
        Args:
            method: HTTP method (GET, POST, etc.)
            endpoint: API endpoint path
            data: Request payload for POST/PUT
            use_cache: Whether to use caching for this request
            
        Returns:
            Parsed JSON response
            
        Raises:
            httpx.TimeoutException: On timeout (will be retried)
            httpx.ConnectError: On connection failure (will be retried)
            httpx.HTTPStatusError: On HTTP error status (triggers circuit breaker)
            CircuitBreakerOpenError: When circuit breaker is open
        """
        # Build cache key for idempotent operations
        cache_key = None
        if use_cache and method.upper() == "GET":
            cache_key = f"{method}:{endpoint}"
            cached = await self._cache.get(cache_key)
            if cached is not None:
                logger.debug(f"Cache hit for {endpoint}")
                return cached
        
        # Execute with circuit breaker protection
        return await self._circuit_breaker.call(
            self._execute_request,
            method,
            endpoint,
            data,
            cache_key
        )
    
    @retry(
        retry=retry_if_exception_type((httpx.TimeoutException, httpx.ConnectError)),
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=2, min=4, max=10),
        before_sleep=before_sleep_log(logger, logging.WARNING)
    )
    async def _execute_request(
        self,
        method: str,
        endpoint: str,
        data: Optional[Dict],
        cache_key: Optional[str]
    ) -> Dict[str, Any]:
        """
        Execute HTTP request with retry logic.
        
        This method is decorated with tenacity retry for transient failures.
        
        Args:
            method: HTTP method
            endpoint: API endpoint
            data: Request data
            cache_key: Key for caching (if applicable)
            
        Returns:
            JSON response data
        """
        client = self._get_client()
        url = f"/mcp{endpoint}"
        
        logger.debug(f"{method} {url}")
        start_time = time.time()
        
        try:
            if method.upper() == "GET":
                response = await client.get(url)
            elif method.upper() == "POST":
                response = await client.post(url, json=data)
            elif method.upper() == "PUT":
                response = await client.put(url, json=data)
            elif method.upper() == "DELETE":
                response = await client.delete(url)
            else:
                raise ValueError(f"Unsupported HTTP method: {method}")
            
            duration = (time.time() - start_time) * 1000
            
            # Raise exception for 4xx/5xx status codes
            response.raise_for_status()
            
            result = response.json()
            
            logger.debug(f"{method} {url} completed in {duration:.1f}ms")
            
            # Cache successful GET responses
            if cache_key and method.upper() == "GET":
                await self._cache.set(cache_key, result)
            
            return result
            
        except httpx.TimeoutException:
            logger.warning(f"Timeout on {method} {url} - will retry")
            raise
        except httpx.ConnectError:
            logger.warning(f"Connection error on {method} {url} - will retry")
            raise
        except httpx.HTTPStatusError as e:
            logger.error(
                f"HTTP error {e.response.status_code} on {method} {url}: "
                f"{e.response.text[:200]}"
            )
            raise
    
    # ====================================================================
    # Public API Methods
    # ====================================================================
    
    async def health_check(self) -> bool:
        """
        Check MCP server health status.
        
        Returns:
            True if server is healthy, False otherwise
        """
        try:
            response = await self._make_request("GET", "/health", use_cache=False)
            healthy = response.get("status") == "healthy"
            
            if healthy:
                logger.debug("Health check: Server is healthy")
            else:
                logger.warning(f"Health check: Server reports unhealthy: {response}")
            
            return healthy
            
        except Exception as e:
            logger.warning(f"Health check failed: {e}")
            return False
    
    async def invoke_tool(
        self,
        tool: str,
        params: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Generic tool invocation with fallback support.
        
        Args:
            tool: Tool name to invoke
            params: Tool parameters
            
        Returns:
            Response with success flag and data or error
        """
        if not self._connected:
            logger.error("Client not connected - attempting fallback")
            return await self._fallback_response(tool, params)
        
        try:
            request_data = {
                "tool": tool,
                "parameters": params,
                "timestamp": datetime.now().isoformat()
            }
            
            response = await self._make_request(
                "POST",
                f"/tools/{tool}/invoke",
                data=request_data,
                use_cache=False
            )
            
            return {
                "success": True,
                "data": response.get("result"),
                "metadata": {
                    "tool": tool,
                    "timestamp": datetime.now().isoformat()
                }
            }
            
        except CircuitBreakerOpenError:
            logger.warning(f"Circuit breaker open for {tool} - using fallback")
            return await self._fallback_response(tool, params)
            
        except Exception as e:
            logger.error(f"Error invoking tool {tool}: {e}")
            return await self._fallback_response(tool, params, error=str(e))
    
    async def generate_image(
        self,
        prompt: str,
        style: Optional[str] = "fantasy",
        size: Optional[str] = "1024x1024",
        **kwargs
    ) -> Dict[str, Any]:
        """
        Generate image using MCP image generation tool.
        
        Args:
            prompt: Text description of desired image
            style: Visual style (fantasy, realistic, abstract, etc.)
            size: Image dimensions (e.g., "1024x1024")
            **kwargs: Additional parameters for the tool
            
        Returns:
            Response with image URL and metadata
        """
        params = {
            "prompt": prompt,
            "style": style,
            "size": size,
            **kwargs
        }
        
        return await self.invoke_tool("image_generation", params)
    
    async def analyze_code(
        self,
        code: str,
        language: Optional[str] = "javascript",
        **kwargs
    ) -> Dict[str, Any]:
        """
        Analyze code quality using MCP code analysis tool.
        
        Args:
            code: Source code to analyze
            language: Programming language
            **kwargs: Additional parameters for the tool
            
        Returns:
            Response with quality score, issues, and suggestions
        """
        params = {
            "code": code,
            "language": language,
            **kwargs
        }
        
        return await self.invoke_tool("code_analysis", params)
    
    async def search_docs(
        self,
        query: str,
        source: Optional[str] = "all",
        **kwargs
    ) -> Dict[str, Any]:
        """
        Search documentation using MCP documentation search tool.
        
        Args:
            query: Search query string
            source: Documentation source to search
            **kwargs: Additional parameters for the tool
            
        Returns:
            Response with search results and relevance scores
        """
        params = {
            "query": query,
            "source": source,
            **kwargs
        }
        
        return await self.invoke_tool("documentation_search", params)
    
    async def process_data(
        self,
        data: Any,
        operation: str = "filter",
        **kwargs
    ) -> Dict[str, Any]:
        """
        Process and transform data using MCP data processing tool.
        
        Args:
            data: Data to process
            operation: Processing operation (filter, transform, aggregate)
            **kwargs: Additional parameters for the tool
            
        Returns:
            Response with processed data
        """
        params = {
            "data": data,
            "operation": operation,
            **kwargs
        }
        
        return await self.invoke_tool("data_processing", params)
    
    # ====================================================================
    # Fallback & Monitoring
    # ====================================================================
    
    async def _fallback_response(
        self,
        tool: str,
        params: Dict[str, Any],
        error: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Generate fallback response when MCP server is unavailable.
        
        Provides graceful degradation by returning sensible defaults
        or cached values based on the tool type.
        
        Args:
            tool: Name of the tool that failed
            params: Original parameters
            error: Error message (if any)
            
        Returns:
            Fallback response with success=False
        """
        logger.info(f"Generating fallback for {tool}")
        
        fallback_data = {}
        
        if tool == "image_generation":
            prompt = params.get("prompt", "")
            fallback_data = {
                "url": f"fallback://generated/{hash(prompt) % 10000:04d}.png",
                "prompt": prompt,
                "style": params.get("style", "fantasy"),
                "dimensions": params.get("size", "1024x1024"),
                "format": "png",
                "fallback": True
            }
            
        elif tool == "code_analysis":
            code = params.get("code", "")
            fallback_data = {
                "language": params.get("language", "javascript"),
                "lines": len(code.split("\n")) if code else 0,
                "issues": [],
                "quality_score": None,
                "suggestions": [
                    "MCP server unavailable - analysis skipped",
                    "Retry when server is back online"
                ],
                "fallback": True
            }
            
        elif tool == "documentation_search":
            fallback_data = {
                "results": [],
                "query": params.get("query", ""),
                "total": 0,
                "fallback": True,
                "message": "Documentation search unavailable - MCP server down"
            }
            
        elif tool == "data_processing":
            data = params.get("data", [])
            fallback_data = {
                "data": data,
                "operation": params.get("operation", "none"),
                "fallback": True,
                "message": "Data processing unavailable - returning input unchanged"
            }
        
        return {
            "success": False,
            "data": fallback_data,
            "error": error or "MCP server unavailable - using fallback",
            "fallback": True,
            "metadata": {
                "tool": tool,
                "timestamp": datetime.now().isoformat()
            }
        }
    
    def get_stats(self) -> Dict[str, Any]:
        """
        Get comprehensive client statistics for monitoring.
        
        Returns:
            Dictionary with circuit breaker, cache, and connection stats
        """
        return {
            "connected": self._connected,
            "available_tools": self._available_tools,
            "circuit_breaker": self._circuit_breaker.get_state(),
            "cache": self._cache.get_stats(),
            "config": {
                "base_url": self.config.base_url,
                "timeout": self.config.timeout,
                "max_retries": self.config.max_retries,
                "cache_ttl": self.config.cache_ttl
            }
        }


# ============================================================================
# Convenience Functions
# ============================================================================

async def create_mcp_client(
    base_url: str,
    api_key: str,
    **kwargs
) -> ArcaneaMCPClient:
    """
    Factory function to create and connect MCP client.
    
    Convenience function that creates a client with the given
    configuration and immediately connects to the server.
    
    Args:
        base_url: MCP server URL
        api_key: Authentication key
        **kwargs: Additional config options (timeout, max_retries, etc.)
        
    Returns:
        Connected ArcaneaMCPClient instance
        
    Example:
        ```python
        client = await create_mcp_client(
            "http://localhost:3000",
            "api-key"
        )
        result = await client.generate_image("Dragon")
        await client.close()
        ```
    """
    config = MCPConfig(base_url=base_url, api_key=api_key, **kwargs)
    client = ArcaneaMCPClient(config)
    await client.connect()
    return client


# ============================================================================
# Example Usage & Testing
# ============================================================================

async def demo():
    """
    Demonstrate Arcanea MCP Client v2 capabilities.
    
    This demo shows:
    - Client initialization and connection
    - Health check monitoring
    - Tool invocation with resilience
    - Statistics and monitoring
    - Graceful cleanup
    """
    print("🌟 Arcanea MCP Client v2 - Production Demo\n")
    
    # Configuration
    config = MCPConfig(
        base_url="http://localhost:3000",
        api_key="demo-api-key",
        timeout=30.0,
        max_retries=3,
        cache_ttl=3600,
        circuit_breaker_threshold=5,
        circuit_breaker_recovery=30
    )
    
    # Create client using context manager (recommended)
    async with ArcaneaMCPClient(config) as client:
        print("✅ Client initialized")
        
        # Health check
        healthy = await client.health_check()
        print(f"   Server health: {'✅ Healthy' if healthy else '❌ Unhealthy'}")
        
        if healthy:
            print("\n🎨 Generating image...")
            image_result = await client.generate_image(
                prompt="Epic fire dragon soaring through crystal mountains",
                style="fantasy",
                size="1024x1024"
            )
            print(f"   Success: {image_result['success']}")
            if image_result['success']:
                print(f"   URL: {image_result['data'].get('url', 'N/A')}")
            else:
                print(f"   Using fallback: {image_result.get('fallback', False)}")
            
            print("\n💎 Analyzing code...")
            code_sample = """
            function combat(player, enemy) {
                while(player.hp > 0 && enemy.hp > 0) {
                    player.attack(enemy);
                    if(enemy.hp > 0) enemy.attack(player);
                }
                return player.hp > 0 ? player : null;
            }
            """
            analysis = await client.analyze_code(code_sample, language="javascript")
            print(f"   Success: {analysis['success']}")
            if analysis['success']:
                print(f"   Quality Score: {analysis['data'].get('quality_score', 'N/A')}")
            
            print("\n📚 Searching documentation...")
            docs = await client.search_docs("getting started with arcanea")
            print(f"   Success: {docs['success']}")
            if docs['success']:
                results = docs['data'].get('results', [])
                print(f"   Found {len(results)} results")
            
            print("\n📊 Processing data...")
            sample_data = [
                {"id": 1, "value": 100},
                {"id": 2, "value": 200},
                {"id": 3, "value": 300}
            ]
            processed = await client.process_data(sample_data, operation="filter")
            print(f"   Success: {processed['success']}")
        
        # Show statistics
        print("\n📈 Client Statistics:")
        stats = client.get_stats()
        print(f"   Circuit Breaker State: {stats['circuit_breaker']['state']}")
        print(f"   Cache Hit Rate: {stats['cache']['hit_rate_percent']:.1f}%")
        print(f"   Available Tools: {len(stats['available_tools'])}")
    
    print("\n✅ Demo complete. Client resources cleaned up.")


if __name__ == "__main__":
    # Run the demo
    asyncio.run(demo())
