function salvarPerfil(){

let nome =
document.getElementById("nome").value;

let peso =
Number(document.getElementById("peso").value);

let altura =
Number(document.getElementById("altura").value);


let imc = peso / (altura * altura);


localStorage.setItem("nome",nome);
localStorage.setItem("peso",peso);
localStorage.setItem("altura",altura);
localStorage.setItem("imc",imc.toFixed(1));


document.getElementById("resultado").innerHTML =
`
Olá ${nome}! 👋<br><br>

Seu IMC é: ${imc.toFixed(1)}<br>

${classificarIMC(imc)}

`;

}


function classificarIMC(imc){

if(imc < 18.5)
return "Abaixo do peso";

if(imc < 25)
return "Peso normal";

if(imc < 30)
return "Sobrepeso";

if(imc < 35)
return "Obesidade grau I";

if(imc < 40)
return "Obesidade grau II";

return "Obesidade grau III";

}