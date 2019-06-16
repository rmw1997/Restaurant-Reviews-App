const cache_name = 'v1';

/* INSTALLING */
self.addEventListener('install',function(event){
    event.waitUntil(
        caches.open(cache_name).then(function(cache){
            return cache.addAll([
                '/',
                '/css/styles.css',
                '/index.html',
                '/restaurant.html',
                '/data/restaurants.json',
                '/js/dbhelper.js',
                '/js/main.js',
                '/js/restaurant_info.js',
                '/img/1.jpg',
                '/img/2.jpg',
                '/img/3.jpg',
                '/img/4.jpg',
                '/img/5.jpg',
                '/img/6.jpg',
                '/img/7.jpg',
                '/img/8.jpg',
                '/img/9.jpg',
                '/img/10.jpg',
            ]);
        })
    );
});

/* FETCHING */

//Resource: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers

self.addEventListener('fetch', function(event) {
 
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request).then(function(response) {
          caches.open(cache_name).then(function(cache) {
            let ClonedResponse = response.clone();
            cache.put(event.request, ClonedResponse);
          });
          return response;
        });
      }).catch(function() {
        return caches.match('/index.html');
      })
    );
  });

 
