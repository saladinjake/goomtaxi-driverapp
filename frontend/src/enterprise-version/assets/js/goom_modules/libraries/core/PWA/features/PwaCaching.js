import LiveUrl from '../../../backend/services/apiservices/helpers/getOnlineUrlConnection';

class PwaCaching{
	constructor(){
	  this.STATIC_FILES = [
		  '/',
		  '/UI/',
		  '/UI/index.html',
		  '/UI/interventions.html',
		  '/UI/redflags.html',
		  '/UI/login.html',
		  '/UI/offline.html',
		  '/UI/singleItem.html',
		  '/UI/reportForm.html',
		  '/UI/js/Main.js',
		  '/UI/js/promise.js',
		  '/UI/css/mainstyles.css',
		  '/UI/css/mainstyles_backend.css',
		  '/UI/images/a.jpg',
		  'https://fonts.googleapis.com/css?family=Roboto:400,700',
		  'https://fonts.googleapis.com/icon?family=Material+Icons'
		  
    ];
	  this.CACHE_STATIC_NAME = 'static-v0';
	  this.CACHE_DYNAMIC_NAME = 'dynamic-v0'
	  this.registration = null;

	}
	attachEvents(){
	
	 this.staticCacheInit();
	  this.removeOldCache();
	  this.cacheWithNetworkStrategy('/interventions');
	 this.cacheWithNetworkStrategy('/red-flags')  
	}

	staticCacheInit(){
      self.addEventListener('install', function(event) {
		  console.log('[Service Worker] Installing Service Worker ...', event);
		  event.waitUntil(
		    caches.open(this.CACHE_STATIC_NAME).then(function(cache) {
		      console.log('[Service Worker] Precaching App Shell');
		      cache.addAll( this.STATIC_FILES);
		    }),
		  );
		});
	}

	removeOldCache(){
	  self.addEventListener('activate', function(event) {
		  console.log('[Service Worker] Activating Service Worker ....', event);
		  event.waitUntil(
		    caches.keys().then(function(keyList) {
		      return Promise.all(
		        keyList.map(function(key) {
		          if (key !== this.CACHE_STATIC_NAME && key !== this.CACHE_DYNAMIC_NAME) {
		            console.log('[Service Worker] Removing old cache.', key);
		            return caches.delete(key);
		          }
		        }),
		      );
		    }),
		  );
		  return self.clients.claim();
	  });
	}

	cacheWithNetworkStrategy(sub_url){
	  self.addEventListener('fetch', function(event) {
		  let url = LiveUrl() + sub_url;
		  if (event.request.url.indexOf(url) > -1) {
		    event.respondWith(
		      caches.open(this.CACHE_DYNAMIC_NAME).then(function(cache) {
		        return fetch(event.request).then(function(res) {
		          // trimCache(CACHE_DYNAMIC_NAME, 3);
		          cache.put(event.request, res.clone());
		          return res;
		        });
		      }),
		    );
		  } else if (this.isInArray(event.request.url, this.STATIC_FILES)) {
		    event.respondWith(caches.match(event.request));
		  } else {
		    event.respondWith(
		      caches.match(event.request).then(function(response) {
		        if (response) {
		          return response;
		        } else {
		          return fetch(event.request)
		            .then(function(res) {
		              return caches.open(this.CACHE_DYNAMIC_NAME).then(function(cache) {
		                // trimCache(CACHE_DYNAMIC_NAME, 3);
		                cache.put(event.request.url, res.clone());
		                return res;
		              });
		            })
		            .catch(function(err) {
		              return caches.open(this.CACHE_STATIC_NAME).then(function(cache) {
		                if (event.request.headers.get('accept').includes('text/html')) {
		                  return cache.match('/offline.html');
		                }
		              });
		            });
		        }
		      }),
		    );
		  }
		});

	}


	isInArray(string, array) {
	  let cachePath;
	  if (string.indexOf(self.origin) === 0) {
	    // request targets domain where we serve the page from (i.e. NOT a CDN)
	    console.log('matched ', string);
	    cachePath = string.substring(self.origin.length); // take the part of the URL AFTER the domain (e.g. after localhost:8080)
	  } else {
	    cachePath = string; // store the full request (for CDNs)
	  }
	  return array.indexOf(cachePath) > -1;
    }

}

export default PwaCaching;