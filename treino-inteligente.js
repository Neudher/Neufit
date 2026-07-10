function concluirTreino(){

let hoje =
new Date().toLocaleDateString();


let ultimo =
localStorage.getItem("ultimoTreino");


let sequencia =
Number(localStorage.getItem("sequencia"))
|| 0;


if(ultimo !== hoje){

sequencia++;

localStorage.setItem(
"sequencia",
sequencia
);

localStorage.setItem(
"ultimoTreino",
hoje
);

}


mostrarSequencia();

alert("Treino concluído! 💪🔥");

}



function mostrarSequencia(){

let sequencia =
localStorage.getItem("sequencia")
|| 0;


document.getElementById("sequencia")
.innerHTML =
`${sequencia} dias de evolução 🔥`;

}


mostrarSequencia();