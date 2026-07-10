function registrarPeso(){

let peso =
document.getElementById("novoPeso").value;


let lista =
JSON.parse(localStorage.getItem("pesos")) || [];


lista.push({
data:new Date().toLocaleDateString(),
peso:peso
});


localStorage.setItem(
"pesos",
JSON.stringify(lista)
);


mostrarHistorico();

}



function mostrarHistorico(){

let lista =
JSON.parse(localStorage.getItem("pesos")) || [];


let texto="";


lista.forEach(item=>{

texto += 
`${item.data} - ${item.peso} kg<br>`;

});


document.getElementById("historico")
.innerHTML = texto;

}


mostrarHistorico();