function calcularPontos(){

let pontos = 0;


if(document.getElementById("treino").checked){

pontos += 40;

}


if(document.getElementById("agua").checked){

pontos += 30;

}


if(document.getElementById("dieta").checked){

pontos += 30;

}



localStorage.setItem(
"pontos",
pontos
);



document.getElementById("resultado")
.innerHTML =

`
🔥 Pontuação de hoje: ${pontos}/100

<br><br>

${
pontos == 100 ?
"Perfeito! Dia completo 💪" :
"Continue evoluindo!"
}

`;

}