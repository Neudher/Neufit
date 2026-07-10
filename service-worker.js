const CACHE_NAME = "neufit-v1";

const arquivos = [
"index.html",
"dashboard.html",
"treino.html",
"dieta.html",
"perfil.html",
"style.css",
"app.js",
"dashboard.js",
"treino.js",
"perfil.js"
];


self.addEventListener("install", evento => {

evento.waitUntil(

caches.open(CACHE_NAME)
.then(cache => {

return cache.addAll(arquivos);

})

);

});



self.addEventListener("fetch", evento => {

evento.respondWith(

caches.match(evento.request)
.then(resposta => {

return resposta || fetch(evento.request);

})

);

});