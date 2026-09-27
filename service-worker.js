const CACHE="helping-handz-approved-v1";
const ASSETS=["./","./index.html","./manifest.json","./helping-handz-background.png","./icon-192.png","./icon-512.png"];
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{
  const u=new URL(e.request.url);
  if(u.origin===self.location.origin) e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));
});
