function ativarLembrete(){

if(Notification.permission !== "granted"){
 Notification.requestPermission();
}

setTimeout(()=>{

new Notification("Neufit 💪",{
 body:"Hora de tomar seu medicamento!"
});

},5000);

}