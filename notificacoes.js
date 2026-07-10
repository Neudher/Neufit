function pedirPermissao(){

if("Notification" in window){

Notification.requestPermission();

}

}



function enviarNotificacao(titulo, mensagem){

if(Notification.permission === "granted"){

new Notification(titulo,{

body: mensagem

});

}

}



// Lembrete de medicamento

function lembreteMedicamento(){

let horaSalva =
localStorage.getItem("remedio");


if(!horaSalva) return;


setInterval(()=>{

let agora =
new Date()
.toTimeString()
.substring(0,5);


if(agora === horaSalva){

enviarNotificacao(
"💊 Neufit",
"Hora de tomar seu medicamento!"
);

}

},60000);

}



// Lembrete de água

function lembreteAgua(){

setInterval(()=>{

enviarNotificacao(
"💧 Neufit",
"Hora de beber água!"
);

},7200000);

}



// Motivação

function motivacao(){

let mensagens=[

"🔥 Você está evoluindo!",
"💪 Mais um dia de foco!",
"🏆 Seu futuro agradece!"

];


let aleatoria =
mensagens[
Math.floor(Math.random()*mensagens.length)
];


enviarNotificacao(
"Neufit",
aleatoria
);

}


pedirPermissao();

lembreteMedicamento();

lembreteAgua();