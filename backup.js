function exportarDados(){

let dados = {

nome: localStorage.getItem("nome"),

peso: localStorage.getItem("peso"),

altura: localStorage.getItem("altura"),

imc: localStorage.getItem("imc"),

pesos: JSON.parse(
localStorage.getItem("pesos")
|| "[]"
),

xp: localStorage.getItem("xp"),

agua: localStorage.getItem("agua"),

remedio: localStorage.getItem("remedio")

};



let arquivo = new Blob(

[JSON.stringify(dados,null,2)],

{
type:"application/json"
}

);



let link =
document.createElement("a");


link.href =
URL.createObjectURL(arquivo);


link.download =
"backup-neufit.json";


link.click();


}



function importarDados(){

let arquivo =
document.getElementById("arquivo")
.files[0];


if(!arquivo) return;



let leitor =
new FileReader();



leitor.onload=function(e){


let dados =
JSON.parse(e.target.result);



for(let item in dados){

localStorage.setItem(
item,
JSON.stringify(dados[item])
);

}



document.getElementById("mensagem")
.innerHTML =
"✅ Dados restaurados com sucesso!";


}



leitor.readAsText(arquivo);

}