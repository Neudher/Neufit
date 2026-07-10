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