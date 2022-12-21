
async function getQuestions() {
    let resultado = await fetch("https://opentdb.com/api.php?amount=10");
    let dataBase = await resultado.json();
    const preguntas = dataBase.results;

    return preguntas;
}
/* "question": 
"correct_answer":
"incorrect_answers" */

async function init(){
    let preguntas = await getQuestions()
    let num = 0
    console.log(preguntas);
    document.querySelector('#btn').addEventListener('click',()=> {
        nextQuestion(preguntas[num])
        num++
    })
}

init()
async function nextQuestion(preguntas) {
    
    let espacio = document.querySelector('#espacioPregunta')
    let opciones = document.querySelector('#opciones')
    espacio.innerHTML = ''
    opciones.innerHTML = ''
    console.log(num);
    
   espacio.innerHTML = `<div>
   <legend id='legend${num}'>${preguntas.question}</legend>
   </div>` 
   let arrMezcla = []
   for (let i = 0; i < preguntas.question.length; i++) {
    correctas = preguntas.correct_answer
    incorrectas = preguntas.incorrect_answers[i]
    arrMezcla = correctas.concat(incorrectas)
    mezclarArray(arrMezcla)
    } 
    console.log(arrMezcla);
   for (let j = contadorPregunta; j < arrMezcla[i].length; j++) {
    imprimir2 +=
    `<div>
    <label for="">${arrMezcla[i][j]}</label>
    <input type="radio" id="radio${j}" name="${Math.trunc(j/4)}" value="${arrMezcla[i][j]}"> 
    </div>` 


    }

    opciones.innerHTML = imprimir2

     contadorPregunta = contadorPregunta +1
     console.log(contadorPregunta);
 
    
}

console.log(contadorPregunta);

function mezclarArray(arr) {
    
    for (let i = arr.length - 1; i >= 0; i--) {
          const s = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[s]] = [arr[s], arr[i]];
          
        }
      }

var contadorPregunta = 0 

 /* async function printQuestions() {
    console.log('jajaja');
    let questions = await getQuestions()
    let arrMezcla = [];
    let correctas = []
    let incorrectas = []

    for (let i = 0; i < questions.pregunta.length; i++) {

        correctas = [questions.correcta[i]]
        incorrectas = questions.incorrectas[i]
        arrMezcla[i] = correctas.concat(incorrectas)
        mezclarArray(arrMezcla[i])
    } 

    let imprimir = ''
    let imprimir2 = ''
  
   if (contadorPregunta < 10) {
    for (let i = contadorPregunta; i < 1 ; i++) {
        imprimir +=  `<div>
        <legend id='legend${i}'>${questions.pregunta[i]}</legend>
        </div>`  

        for (let j = contadorPregunta; j < arrMezcla[i].length; j++) {
            imprimir2 +=
            `<div>
            <label for="">${arrMezcla[i][j]}</label>
            <input type="radio" id="radio${j}" name="${Math.trunc(j/4)}" value="${arrMezcla[i][j]}"> 
            </div>` 
    
        }
   
    }

    
   }
    

    document.querySelector('#espacioPregunta').innerHTML = imprimir
    document.querySelector('#opciones').innerHTML = imprimir2


      /*   const etiqueta = document.createElement("legend");
        document.getElementById("espacioPregunta").appendChild(etiqueta);
        etiqueta.innerHTML = questions.pregunta;
        for (let j = 0; j < arrMezcla.length; j++) {
       
        const division2 = document.createElement("div");
        document.getElementById("espacioPregunta").appendChild(division2);
        division2.id = `respuesta${[j]}`;
        const opciones = document.createElement("label");
        opciones.setAttribute('for',`${j}`)
        document.getElementById(`respuesta${[j]}`).appendChild(opciones);
        opciones.innerHTML = shuffledArray[j];
        const radio = document.createElement("input");
        radio.setAttribute('id',`${j}`)
        radio.setAttribute('name',`pregunta${i}`)//el name tambien deberia cambiar pero por bloque 
        radio.setAttribute('value', `${shuffledArray[j]}`)
        radio.type = "radio";
        division2.appendChild(radio); 
    }  
    
}*/





 