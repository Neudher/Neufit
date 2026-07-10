let nome =
localStorage.getItem("nome")
|| "Atleta";


let peso =
localStorage.getItem("peso")
|| "--";


let meta = 90;



document.getElementById("nomeUsuario")
.innerHTML =
`Olá, ${nome}! Vamos evoluir hoje 💪`;



document.getElementById("pesoAtual")
.innerHTML =
`${peso} kg`;



document.getElementById("meta")
.innerHTML =
`Meta: ${meta} kg`;



let progresso =
((135 - peso) / (135 - meta))*100;



if(progresso < 0) progresso = 0;


document.getElementById("progresso")
.style.width =
progresso+"%";