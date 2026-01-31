"""
Integration Tests for MCP Client
Tests connection to server, tool invocation, retry logic, and circuit breaker
"""

import pytest
import asyncio
from unittest.mock import Mock, patch, AsyncMock
from dataclasses import dataclass
from typing import Dict, List, Any, Optional
import json


@dataclass
class MCPRequest:
    """MCP Request structure"""
    tool: str
    params: Dict[str, Any]
    request_id: str


@dataclass
class MCPResponse:
    """MCP Response structure"""
    success: bool
    data: Any
    error: Optional[str] = None
    request_id: Optional[str] = None


class MCPClient:
    """MCP Client with retry and circuit breaker logic"""
    
    def __init__(self, base_url: str = "http://localhost:3000", max_retries: int = 3):
        self.base_url = base_url
        self.max_retries = max_retries
        self.circuit_open = False
        self.failure_count = 0
        self.failure_threshold = 5
        self.circuit_timeout = 60  # seconds
        self.last_failure_time = None
        self.session = None
    
    async def connect(self) -> bool:
        """Establish connection to MCP server"""
        try:
            # Simulate connection check
            response = await self._make_request("/health", method="GET")
            return response.get("status") == "ok"
        except Exception as e:
            return False
    
    async def invoke_tool(self, tool_name: str, params: Dict[str, Any]) -> MCPResponse:
        """Invoke an MCP tool with retry logic"""
        if self.circuit_open:
            if await self._should_reset_circuit():
                self._reset_circuit()
            else:
                return MCPResponse(
                    success=False,
                    data=None,
                    error="Circuit breaker is open",
                    request_id=None
                )
        
        request = MCPRequest(
            tool=tool_name,
            params=params,
            request_id=f"req_{asyncio.get_event_loop().time()}"
        )
        
        for attempt in range(self.max_retries):
            try:
                response = await self._make_request(
                    "/invoke",
                    method="POST",
                    data={
                        "tool": tool_name,
                        "params": params,
                        "request_id": request.request_id
                    }
                )
                
                self._record_success()
                return MCPResponse(
                    success=True,
                    data=response,
                    request_id=request.request_id
                )
            
            except Exception as e:
                if attempt == self.max_retries - 1:
                    self._record_failure()
                    return MCPResponse(
                        success=False,
                        data=None,
                        error=str(e),
                        request_id=request.request_id
                    )
                await asyncio.sleep(2 ** attempt)  # Exponential backoff
        
        return MCPResponse(success=False, data=None, error="Max retries exceeded")
    
    async def _make_request(self, endpoint: str, method: str = "GET", data: Dict = None) -> Dict:
        """Make HTTP request (mocked in tests)"""
        # This would normally use aiohttp or requests
        pass
    
    def _record_success(self):
        """Record successful request"""
        self.failure_count = 0
    
    def _record_failure(self):
        """Record failed request"""
        self.failure_count += 1
        self.last_failure_time = asyncio.get_event_loop().time()
        
        if self.failure_count >= self.failure_threshold:
            self.circuit_open = True
    
    async def _should_reset_circuit(self) -> bool:
        """Check if circuit should be reset"""
        if self.last_failure_time is None:
            return True
        
        current_time = asyncio.get_event_loop().time()
        return (current_time - self.last_failure_time) > self.circuit_timeout
    
    def _reset_circuit(self):
        """Reset circuit breaker"""
        self.circuit_open = False
        self.failure_count = 0
        self.last_failure_time = None


@pytest.fixture
def mcp_client():
    """Create MCP client instance"""
    return MCPClient(base_url="http://localhost:3000", max_retries=3)


@pytest.fixture
def mock_response():
    """Create mock HTTP response"""
    def _create_response(data: Dict, status: int = 200):
        response = Mock()
        response.status = status
        response.json = AsyncMock(return_value=data)
        return response
    return _create_response


class TestMCPConnection:
    """Test MCP server connection"""
    
    @pytest.mark.asyncio
    async def test_successful_connection(self, mcp_client, mock_response):
        """Test successful connection to MCP server"""
        # Arrange
        health_response = {"status": "ok", "version": "1.0.0"}
        mcp_client._make_request = AsyncMock(return_value=health_response)
        
        # Act
        result = await mcp_client.connect()
        
        # Assert
        assert result is True
        mcp_client._make_request.assert_called_once_with("/health", method="GET")
    
    @pytest.mark.asyncio
    async def test_failed_connection(self, mcp_client):
        """Test failed connection to MCP server"""
        # Arrange
        mcp_client._make_request = AsyncMock(side_effect=Exception("Connection refused"))
        
        # Act
        result = await mcp_client.connect()
        
        # Assert
        assert result is False
    
    @pytest.mark.asyncio
    async def test_connection_with_unhealthy_status(self, mcp_client):
        """Test connection when server returns unhealthy status"""
        # Arrange
        mcp_client._make_request = AsyncMock(return_value={"status": "error"})
        
        # Act
        result = await mcp_client.connect()
        
        # Assert
        assert result is False


class TestToolInvocation:
    """Test MCP tool invocation"""
    
    @pytest.mark.asyncio
    async def test_successful_tool_invocation(self, mcp_client):
        """Test successful tool invocation"""
        # Arrange
        expected_response = {"result": "success", "data": "generated_image.png"}
        mcp_client._make_request = AsyncMock(return_value=expected_response)
        
        # Act
        result = await mcp_client.invoke_tool(
            "generate_image",
            {"prompt": "epic dragon battle", "style": "fantasy"}
        )
        
        # Assert
        assert result.success is True
        assert result.data == expected_response
        assert result.request_id is not None
    
    @pytest.mark.asyncio
    async def test_tool_invocation_with_parameters(self, mcp_client):
        """Test tool invocation with various parameters"""
        # Arrange
        mcp_client._make_request = AsyncMock(return_value={"analysis": "complete"})
        
        # Act
        result = await mcp_client.invoke_tool(
            "analyze_code",
            {
                "code": "function test() { return 42; }",
                "language": "javascript",
                "deep_analysis": True
            }
        )
        
        # Assert
        assert result.success is True
        mcp_client._make_request.assert_called_once()
        call_args = mcp_client._make_request.call_args
        assert call_args[1]["data"]["tool"] == "analyze_code"
    
    @pytest.mark.asyncio
    async def test_tool_invocation_failure(self, mcp_client):
        """Test tool invocation failure"""
        # Arrange
        mcp_client._make_request = AsyncMock(side_effect=Exception("Tool execution failed"))
        
        # Act
        result = await mcp_client.invoke_tool("unknown_tool", {})
        
        # Assert
        assert result.success is False
        assert result.error is not None


class TestRetryLogic:
    """Test retry mechanism"""
    
    @pytest.mark.asyncio
    async def test_successful_retry(self, mcp_client):
        """Test successful invocation after retries"""
        # Arrange
        mcp_client._make_request = AsyncMock(side_effect=[
            Exception("Temporary error"),
            Exception("Another error"),
            {"result": "success"}
        ])
        
        # Act
        result = await mcp_client.invoke_tool("test_tool", {})
        
        # Assert
        assert result.success is True
        assert mcp_client._make_request.call_count == 3
    
    @pytest.mark.asyncio
    async def test_retry_exhaustion(self, mcp_client):
        """Test behavior when all retries are exhausted"""
        # Arrange
        mcp_client._make_request = AsyncMock(side_effect=Exception("Persistent error"))
        
        # Act
        result = await mcp_client.invoke_tool("test_tool", {})
        
        # Assert
        assert result.success is False
        assert mcp_client._make_request.call_count == 3  # max_retries
    
    @pytest.mark.asyncio
    async def test_no_retry_on_success(self, mcp_client):
        """Test that successful requests don't trigger retries"""
        # Arrange
        mcp_client._make_request = AsyncMock(return_value={"result": "success"})
        
        # Act
        result = await mcp_client.invoke_tool("test_tool", {})
        
        # Assert
        assert result.success is True
        assert mcp_client._make_request.call_count == 1


class TestCircuitBreaker:
    """Test circuit breaker pattern"""
    
    @pytest.mark.asyncio
    async def test_circuit_opens_after_failures(self, mcp_client):
        """Test circuit opens after threshold failures"""
        # Arrange
        mcp_client._make_request = AsyncMock(side_effect=Exception("Service unavailable"))
        mcp_client.failure_threshold = 3
        
        # Act
        for _ in range(3):
            await mcp_client.invoke_tool("test_tool", {})
        
        # Assert
        assert mcp_client.circuit_open is True
    
    @pytest.mark.asyncio
    async def test_circuit_blocks_requests_when_open(self, mcp_client):
        """Test that requests are blocked when circuit is open"""
        # Arrange
        mcp_client.circuit_open = True
        mcp_client.last_failure_time = asyncio.get_event_loop().time()
        
        # Act
        result = await mcp_client.invoke_tool("test_tool", {})
        
        # Assert
        assert result.success is False
        assert result.error == "Circuit breaker is open"
        mcp_client._make_request.assert_not_called()
    
    @pytest.mark.asyncio
    async def test_circuit_resets_after_timeout(self, mcp_client):
        """Test circuit resets after timeout period"""
        # Arrange
        mcp_client.circuit_open = True
        mcp_client.last_failure_time = asyncio.get_event_loop().time() - 61  # 61 seconds ago
        mcp_client._make_request = AsyncMock(return_value={"result": "success"})
        
        # Act
        result = await mcp_client.invoke_tool("test_tool", {})
        
        # Assert
        assert mcp_client.circuit_open is False
        assert result.success is True
    
    @pytest.mark.asyncio
    async def test_success_resets_failure_count(self, mcp_client):
        """Test that successful requests reset failure count"""
        # Arrange
        mcp_client.failure_count = 3
        mcp_client._make_request = AsyncMock(return_value={"result": "success"})
        
        # Act
        await mcp_client.invoke_tool("test_tool", {})
        
        # Assert
        assert mcp_client.failure_count == 0


class TestErrorHandling:
    """Test error handling scenarios"""
    
    @pytest.mark.asyncio
    async def test_network_error_handling(self, mcp_client):
        """Test handling of network errors"""
        # Arrange
        mcp_client._make_request = AsyncMock(side_effect=ConnectionError("Network unreachable"))
        
        # Act
        result = await mcp_client.invoke_tool("test_tool", {})
        
        # Assert
        assert result.success is False
        assert "Network unreachable" in result.error
    
    @pytest.mark.asyncio
    async def test_timeout_error_handling(self, mcp_client):
        """Test handling of timeout errors"""
        # Arrange
        mcp_client._make_request = AsyncMock(side_effect=asyncio.TimeoutError("Request timed out"))
        
        # Act
        result = await mcp_client.invoke_tool("test_tool", {})
        
        # Assert
        assert result.success is False
        assert "timed out" in result.error
    
    @pytest.mark.asyncio
    async def test_invalid_response_handling(self, mcp_client):
        """Test handling of invalid JSON responses"""
        # Arrange
        mcp_client._make_request = AsyncMock(return_value=None)
        
        # Act
        result = await mcp_client.invoke_tool("test_tool", {})
        
        # Assert
        assert result.success is True  # None is a valid response
    
    @pytest.mark.asyncio
    async def test_malformed_request_handling(self, mcp_client):
        """Test handling of malformed requests"""
        # Act - empty tool name
        result = await mcp_client.invoke_tool("", {})
        
        # Assert - should still make the request
        mcp_client._make_request.assert_called_once()


class TestMCPIntegration:
    """Integration tests with mock server"""
    
    @pytest.mark.asyncio
    async def test_full_workflow(self, mcp_client):
        """Test complete workflow from connection to tool invocation"""
        # Arrange
        responses = {
            "/health": {"status": "ok", "version": "1.0.0"},
            "/invoke": {"result": "image_generated", "url": "http://example.com/image.png"}
        }
        
        async def mock_request(endpoint, method="GET", data=None):
            return responses.get(endpoint, {})
        
        mcp_client._make_request = mock_request
        
        # Act - Connect
        connected = await mcp_client.connect()
        
        # Act - Invoke tool
        result = await mcp_client.invoke_tool(
            "generate_image",
            {"prompt": "test"}
        )
        
        # Assert
        assert connected is True
        assert result.success is True
        assert result.data["result"] == "image_generated"
    
    @pytest.mark.asyncio
    async def test_multiple_tool_invocations(self, mcp_client):
        """Test multiple sequential tool invocations"""
        # Arrange
        call_count = 0
        
        async def mock_request(endpoint, method="GET", data=None):
            nonlocal call_count
            call_count += 1
            return {"result": f"success_{call_count}"}
        
        mcp_client._make_request = mock_request
        
        # Act
        results = []
        for i in range(5):
            result = await mcp_client.invoke_tool(f"tool_{i}", {})
            results.append(result)
        
        # Assert
        assert all(r.success for r in results)
        assert call_count == 5
        assert mcp_client.failure_count == 0


@pytest.mark.integration
@pytest.mark.mcp
class TestMCPServerIntegration:
    """Tests that require actual MCP server"""
    
    @pytest.mark.skip(reason="Requires actual MCP server running")
    @pytest.mark.asyncio
    async def test_real_server_connection(self):
        """Test connection to real MCP server"""
        # This would connect to a real server for integration testing
        pass
