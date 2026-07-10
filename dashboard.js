let nome =
localStorage.getItem("nome") || "Atleta";


let peso =
localStorage.getItem("peso") || "--";


let imc =
localStorage.getItem("imc") || "--";


document.getElementById("saudacao")
.innerHTML =
`Olá ${nome}! Vamos evoluir hoje 💪`;


document.getElementById("dados")
.innerHTML =
`
Peso atual: ${peso} kg<br>
IMC: ${imc}
`;



let agua = 
Number(localStorage.getItem("agua")) || 0;


function beberAgua(){

agua++;

localStorage.setItem(
"agua",
agua
);

document.getElementById("agua")
.innerHTML =
`${agua} copos hoje`;

}



function salvarRemedio(){

let hora =
document.getElementById("horaRemedio").value;


localStorage.setItem(
"remedio",
hora
);


document.getElementById("status")
.innerHTML =
`Lembrete marcado para ${hora} 💊`;

}
let pesoInicial = 135;

let pesoMeta = 90;


let pesoAtual =
Number(localStorage.getItem("peso"))
|| pesoInicial;


let perdeu =
pesoInicial - pesoAtual;


let total =
pesoInicial - pesoMeta;


let porcentagem =
(perdeu / total) * 100;


if(porcentagem < 0){
porcentagem = 0;
}


if(porcentagem > 100){
porcentagem = 100;
}



document.getElementById("metaTexto")
.innerHTML =

`
Peso atual: ${pesoAtual} kg<br>
Objetivo: ${pesoMeta} kg<br>
Faltam: ${(pesoAtual-pesoMeta).toFixed(1)} kg
`;



document.getElementById("progresso")
.style.width =
porcentagem.toFixed(0)+"%";