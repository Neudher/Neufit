let peso = 
Number(localStorage.getItem("peso"))
|| 135;


let altura =
1.71;


let calorias =
Math.round(peso * 25);


let proteina =
Math.round(peso * 1.6);



document.getElementById("calculos")
.innerHTML =

`
Peso: ${peso} kg<br>
Meta diária aproximada:<br><br>

🔥 Calorias: ${calorias} kcal<br>

💪 Proteína: ${proteina} g/dia

`;