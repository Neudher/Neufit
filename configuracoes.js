function salvarMeta(){

let meta =
document.getElementById("metaPeso").value;


localStorage.setItem(
"metaPeso",
meta
);


alert("Meta salva 🎯");

}




function salvarHorario(){

let hora =
document.getElementById("horaMedicamento")
.value;


localStorage.setItem(
"remedio",
hora
);


alert("Lembrete configurado 💊");

}




function ativarNotificacoes(){


if("Notification" in window){


Notification.requestPermission()
.then(resultado=>{


document.getElementById("status")
.innerHTML =
"Notificações: "+resultado;


});


}


}