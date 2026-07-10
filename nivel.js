let xp =
Number(localStorage.getItem("xp"))
|| 0;



function adicionarXP(valor){

xp += valor;

localStorage.setItem(
"xp",
xp
);

mostrarNivel();

}



function mostrarNivel(){


let nomeNivel;


if(xp < 100){

nomeNivel="🥉 Iniciante";

}

else if(xp < 300){

nomeNivel="🥈 Em evolução";

}

else if(xp < 600){

nomeNivel="🥇 Focado";

}

else if(xp < 1000){

nomeNivel="🔥 Transformação";

}

else{

nomeNivel="👑 Lenda Neufit";

}



document.getElementById("nivel")
.innerHTML =
nomeNivel;



document.getElementById("xp")
.innerHTML =
`${xp} XP`;



let progresso =
(xp % 100);


document.getElementById("barraXP")
.style.width =
progresso+"%";



let medalha="";


if(xp >= 100)
medalha+="🏅 Primeiro passo<br>";

if(xp >= 500)
medalha+="🏆 Guerreiro Neufit<br>";

if(xp >= 1000)
medalha+="👑 Mestre da evolução";


document.getElementById("medalhas")
.innerHTML =
medalha || "Continue treinando 💪";

}



mostrarNivel();