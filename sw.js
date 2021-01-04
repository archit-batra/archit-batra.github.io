self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
		'/index.html',
		'/assets/css/style.css',
		'/assets/img/favicon.png',
		'/assets/img/apple-touch-icon.png',
		'/assets/vendor/bootstrap/css/bootstrap.min.css',
		'/assets/vendor/aos/aos.css',
		'/assets/css/style.css',
		'/assets/vendor/jquery/jquery.min.js',
		'/assets/vendor/jquery.easing/jquery.easing.min.js',
		'/assets/vendor/waypoints/jquery.waypoints.min.js',
		'/assets/vendor/counterup/counterup.min.js',
		'/assets/vendor/typed.js/typed.min.js',
		'/assets/vendor/aos/aos.js',
		'/site.js',
		'/assets/js/main.js',
		'/sw.js',
		'/assets/img/profile-img.webp',
		'/assets/img/testimonials/testimonials-1.webp',
		'/assets/img/hero-bg.webp',
		'/icon-192.png',
		'/icon-512.png',
		'/manifest.json'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request).then(function(response) {
    // caches.match() always resolves
    // but in case of success response will have value
    if (response !== undefined) {
      return response;
    } else {
      return fetch(event.request).then(function (response) {
        // response may be used only once
        // we need to save clone to put one copy in cache
        // and serve second one
        let responseClone = response.clone();

        caches.open('v1').then(function (cache) {
          cache.put(event.request, responseClone);
        });
        return response;
      }).catch(function () {
        return caches.match('/assets/img/profile-img.webp');
      });
    }
  }));
});