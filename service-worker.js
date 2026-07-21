// =========================
// VERSION APP
// =========================

const CACHE_NAME = "horizon-v2";


// =========================
// ARCHIVOS A GUARDAR
// =========================

const FILES_TO_CACHE = [

  "/",
  "/index.html",
  "/manifest.json",

  // ICONO
  "/1.jpeg",

  // PRODUCTOS
  "/2.jpeg",
  "/3.jpeg",
  "/4.jpeg",
  "/5.jpeg"

];



// =========================
// INSTALAR SERVICE WORKER
// =========================

self.addEventListener("install", event => {

  console.log("Service Worker instalado");


  event.waitUntil(

    caches.open(CACHE_NAME)

    .then(cache => {

      return cache.addAll(FILES_TO_CACHE);

    })

  );


  // Activar inmediatamente
  self.skipWaiting();

});




// =========================
// ACTIVAR SERVICE WORKER
// =========================

self.addEventListener("activate", event => {


console.log("Service Worker activo");



event.waitUntil(

  caches.keys()

  .then(cacheNames => {


    return Promise.all(

      cacheNames.map(cache => {


        if(cache !== CACHE_NAME){

          console.log(
          "Eliminando cache vieja:",
          cache
          );


          return caches.delete(cache);

        }


      })

    );


  })


);



self.clients.claim();


});





// =========================
// CARGAR ARCHIVOS
// =========================

self.addEventListener("fetch", event => {


event.respondWith(


caches.match(event.request)

.then(response => {


return response || fetch(event.request);


})


);


});




// =========================
// ACTUALIZAR APP
// =========================

self.addEventListener(
"message",
event => {


if(event.data && event.data.type === "SKIP_WAITING"){


console.log(
"Actualizando HORIZON..."
);


self.skipWaiting();


}


});