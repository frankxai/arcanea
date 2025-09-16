/**
 * ARCANEAN BESTIARY - SERVICE WORKER
 * Advanced PWA implementation with intelligent caching
 * Performance-optimized offline experience
 */

const CACHE_NAME = 'arcanean-bestiary-v1.0.0';
const STATIC_CACHE = 'arcanean-static-v1.0.0';
const DYNAMIC_CACHE = 'arcanean-dynamic-v1.0.0';
const IMAGE_CACHE = 'arcanean-images-v1.0.0';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/assets/css/magical-styles.css',
  '/assets/css/animations.css',
  '/assets/js/core.js',
  '/assets/js/search.js',
  '/data/initial-creatures-dataset.json',
  '/manifest.json',
  // Fonts
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Cinzel+Decorative:wght@400;700&family=Playfair+Display:wght@400;500;600;700&display=swap',
  // Icons
  '/assets/icons/icon-192x192.png',
  '/assets/icons/icon-512x512.png'
];

// Network-first resources
const NETWORK_FIRST = [
  '/api/',
  '/auth/',
  '/search/'
];

// Cache-first resources  
const CACHE_FIRST = [
  '/assets/',
  '/images/',
  'https://fonts.gstatic.com/',
  'https://fonts.googleapis.com/'
];

// Stale-while-revalidate resources
const STALE_WHILE_REVALIDATE = [
  '/data/',
  '/creatures/',
  '/cultures/'
];

// ===== SERVICE WORKER INSTALLATION =====
self.addEventListener('install', (event) => {
  console.log('🛠️ Service Worker: Installing...');
  
  event.waitUntil(
    (async () => {
      try {
        // Pre-cache static assets
        const staticCache = await caches.open(STATIC_CACHE);
        await staticCache.addAll(STATIC_ASSETS);
        
        // Pre-load critical data
        const dynamicCache = await caches.open(DYNAMIC_CACHE);
        
        console.log('✅ Service Worker: Installation complete');
        
        // Skip waiting to activate immediately
        self.skipWaiting();
        
      } catch (error) {
        console.error('❌ Service Worker: Installation failed', error);
      }
    })()
  );
});

// ===== SERVICE WORKER ACTIVATION =====
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker: Activating...');
  
  event.waitUntil(
    (async () => {
      try {
        // Clean up old caches
        const cacheNames = await caches.keys();
        const oldCaches = cacheNames.filter(name => 
          name.startsWith('arcanean-') && 
          ![STATIC_CACHE, DYNAMIC_CACHE, IMAGE_CACHE].includes(name)
        );
        
        await Promise.all(
          oldCaches.map(cacheName => {
            console.log('🗑️ Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          })
        );
        
        // Claim all clients
        await self.clients.claim();
        
        console.log('✅ Service Worker: Activation complete');
        
      } catch (error) {
        console.error('❌ Service Worker: Activation failed', error);
      }
    })()
  );
});

// ===== FETCH HANDLER WITH INTELLIGENT CACHING =====
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) {
    return;
  }
  
  event.respondWith(handleRequest(request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  try {
    // HTML Pages - Network first with cache fallback
    if (request.headers.get('accept')?.includes('text/html')) {
      return await networkFirstStrategy(request, DYNAMIC_CACHE);
    }
    
    // API calls - Network first
    if (NETWORK_FIRST.some(pattern => pathname.startsWith(pattern))) {
      return await networkFirstStrategy(request, DYNAMIC_CACHE);
    }
    
    // Static assets - Cache first
    if (CACHE_FIRST.some(pattern => pathname.startsWith(pattern) || url.href.includes(pattern))) {
      return await cacheFirstStrategy(request, STATIC_CACHE);
    }
    
    // Images - Cache first with longer TTL
    if (request.headers.get('accept')?.includes('image/')) {
      return await cacheFirstStrategy(request, IMAGE_CACHE);
    }
    
    // Data files - Stale while revalidate
    if (STALE_WHILE_REVALIDATE.some(pattern => pathname.startsWith(pattern))) {
      return await staleWhileRevalidateStrategy(request, DYNAMIC_CACHE);
    }
    
    // Default to network first for everything else
    return await networkFirstStrategy(request, DYNAMIC_CACHE);
    
  } catch (error) {
    console.error('❌ Fetch handler error:', error);
    return await handleOfflineRequest(request);
  }
}

// ===== CACHING STRATEGIES =====

// Network first - Fresh content when possible
async function networkFirstStrategy(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.status === 200) {
      const cache = await caches.open(cacheName);
      await cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
    
  } catch (error) {
    // Network failed, try cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      console.log('📱 Serving from cache (offline):', request.url);
      return cachedResponse;
    }
    
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      return await caches.match('/offline.html') || new Response('Offline', { status: 503 });
    }
    
    throw error;
  }
}

// Cache first - Fast loading for static assets
async function cacheFirstStrategy(request, cacheName) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    // Return cached version immediately
    console.log('⚡ Serving from cache:', request.url);
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    
    // Cache the response
    if (networkResponse.status === 200) {
      const cache = await caches.open(cacheName);
      await cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
    
  } catch (error) {
    console.error('❌ Network and cache failed:', request.url);
    throw error;
  }
}

// Stale while revalidate - Best of both worlds
async function staleWhileRevalidateStrategy(request, cacheName) {
  const cachedResponse = await caches.match(request);
  
  // Always try to update in the background
  const networkPromise = fetch(request).then(async (networkResponse) => {
    if (networkResponse.status === 200) {
      const cache = await caches.open(cacheName);
      await cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(() => null);
  
  // Return cached version immediately if available
  if (cachedResponse) {
    console.log('📋 Serving stale from cache:', request.url);
    // Don't await the network promise - let it update in background
    networkPromise;
    return cachedResponse;
  }
  
  // No cache, wait for network
  try {
    const networkResponse = await networkPromise;
    return networkResponse || new Response('Network Error', { status: 503 });
  } catch (error) {
    return new Response('Offline', { status: 503 });
  }
}

// Handle offline requests
async function handleOfflineRequest(request) {
  // Return offline page for navigation
  if (request.mode === 'navigate') {
    const offlinePage = await caches.match('/offline.html');
    return offlinePage || new Response(createOfflineHTML(), {
      headers: { 'Content-Type': 'text/html' }
    });
  }
  
  // Return placeholder for images
  if (request.headers.get('accept')?.includes('image/')) {
    return new Response(createOfflineImageSVG(), {
      headers: { 'Content-Type': 'image/svg+xml' }
    });
  }
  
  return new Response('Offline', { status: 503 });
}

// ===== BACKGROUND SYNC =====
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(handleBackgroundSync());
  }
});

async function handleBackgroundSync() {
  try {
    console.log('🔄 Background sync: Starting...');
    
    // Update critical data
    const cache = await caches.open(DYNAMIC_CACHE);
    
    // Update creature data
    try {
      const dataResponse = await fetch('/data/initial-creatures-dataset.json');
      if (dataResponse.ok) {
        await cache.put('/data/initial-creatures-dataset.json', dataResponse);
        console.log('✅ Background sync: Data updated');
      }
    } catch (error) {
      console.log('⚠️ Background sync: Data update failed');
    }
    
    // Send analytics data if any
    await sendPendingAnalytics();
    
  } catch (error) {
    console.error('❌ Background sync failed:', error);
  }
}

// ===== PUSH NOTIFICATIONS =====
self.addEventListener('push', (event) => {
  if (!event.data) return;
  
  const options = {
    body: event.data.text(),
    icon: '/assets/icons/icon-192x192.png',
    badge: '/assets/icons/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 'arcanean-notification'
    },
    actions: [
      {
        action: 'explore',
        title: 'Explore Creatures',
        icon: '/assets/icons/explore-action.png'
      },
      {
        action: 'dismiss',
        title: 'Dismiss',
        icon: '/assets/icons/dismiss-action.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('New Magical Discovery!', options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/?utm_source=notification&utm_medium=push')
    );
  }
});

// ===== CACHE MANAGEMENT =====
self.addEventListener('message', async (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CACHE_STATS') {
    const stats = await getCacheStats();
    event.ports[0].postMessage(stats);
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    await clearAllCaches();
    event.ports[0].postMessage({ success: true });
  }
});

async function getCacheStats() {
  const cacheNames = await caches.keys();
  const stats = {};
  
  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName);
    const requests = await cache.keys();
    stats[cacheName] = requests.length;
  }
  
  return stats;
}

async function clearAllCaches() {
  const cacheNames = await caches.keys();
  await Promise.all(
    cacheNames.map(cacheName => caches.delete(cacheName))
  );
}

// ===== UTILITY FUNCTIONS =====
function createOfflineHTML() {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Offline - Arcanean Bestiary</title>
      <style>
        body {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: linear-gradient(135deg, #0a0b1e 0%, #1a1b3a 100%);
          color: white;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        .offline-container {
          max-width: 400px;
          padding: 2rem;
        }
        .offline-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }
        .offline-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .offline-message {
          color: #cbd5e1;
          line-height: 1.6;
          margin-bottom: 2rem;
        }
        .retry-button {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border: none;
          padding: 1rem 2rem;
          border-radius: 0.5rem;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s ease;
        }
        .retry-button:hover {
          transform: translateY(-2px);
        }
      </style>
    </head>
    <body>
      <div class="offline-container">
        <div class="offline-icon">🔮</div>
        <h1 class="offline-title">Magic Temporarily Unavailable</h1>
        <p class="offline-message">
          It seems the mystical connection has been disrupted. 
          Please check your internet connection and try again.
        </p>
        <button class="retry-button" onclick="window.location.reload()">
          Restore Connection
        </button>
      </div>
    </body>
    </html>
  `;
}

function createOfflineImageSVG() {
  return `
    <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#6366f1;stop-opacity:0.1" />
          <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:0.1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#gradient)"/>
      <text x="50%" y="50%" text-anchor="middle" fill="#6366f1" font-family="Arial" font-size="48">🔮</text>
      <text x="50%" y="70%" text-anchor="middle" fill="#64748b" font-family="Arial" font-size="16">Image Offline</text>
    </svg>
  `;
}

async function sendPendingAnalytics() {
  // Implementation for sending cached analytics data
  // when connection is restored
}

// ===== PERFORMANCE MONITORING =====
let performanceMetrics = {
  cacheHits: 0,
  cacheMisses: 0,
  networkRequests: 0,
  offlineRequests: 0
};

function updateMetrics(type) {
  performanceMetrics[type]++;
  
  // Send metrics periodically
  if (performanceMetrics.networkRequests % 50 === 0) {
    self.clients.matchAll().then(clients => {
      clients.forEach(client => {
        client.postMessage({
          type: 'SW_METRICS',
          metrics: performanceMetrics
        });
      });
    });
  }
}

console.log('🪄 Arcanean Bestiary Service Worker loaded successfully');