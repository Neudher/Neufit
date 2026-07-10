let registros =
JSON.parse(localStorage.getItem("pesos")) || [];


let datas = registros.map(
item => item.data
);


let valores = registros.map(
item => Number(item.peso)
);



new Chart(
document.getElementById("graficoPeso"),
{

type:"line",

data:{

labels:datas,

datasets:[{

label:"Peso (kg)",

data:valores,

borderWidth:3

}]

},

options:{

responsive:true

}

});