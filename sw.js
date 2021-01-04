// Copyright 2016 Google Inc.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//      http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

//version

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('your-magic-cache').then(function(cache) {
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
  if (event.request.url == 'https://batraarchit.com/') {
    console.info('responding to server fetch with Service Worker!');
    event.respondWith(fetch(event.request).catch(function(e) {
      let out = {Gold: 1, Size: -1, Actions: []};
      return new Response(JSON.stringify(out));
    }));
    return;
  }

  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});