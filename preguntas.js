async function getQuestions() {
    let resultado = await fetch("https://opentdb.com/api.php?amount=10");
    let dataBase = await resultado.json();
    const preguntas = dataBase.results;

    return preguntas;
}

async function init(){
    let pregunta = await getQuestions()
    let num = 0
    nextQuestion(pregunta[num],num)
    num = 1
    console.log(pregunta);
    
    document.querySelector('#btn').addEventListener('click', ()=> {
        /* event.preventDefault()
        console.log(event);
        validar(pregunta[num],num) */
        
        nextQuestion(pregunta[num],num)
        num++
    })
}


init()
async function nextQuestion(pregunta,num) {
    
    let espacio = document.querySelector('#espacioPregunta')
    let opciones = document.querySelector('#opciones')
    //console.log(num);
    
   espacio.innerHTML = `<div>
   <legend id='legend${num}'>${pregunta.question}</legend>
   </div>` 

    let arrMezcla = []
    correcta = [pregunta.correct_answer]
    incorrectas = pregunta.incorrect_answers
    arrMezcla = correcta.concat(incorrectas)
  
    mezclarArray(arrMezcla)
    //console.log(arrMezcla);
    
    
    let imprimir2 = ''
    
    for (let j = 0; j < arrMezcla.length; j++) {
        imprimir2 +=`<div>
        <label for="radio${j}">${arrMezcla[j]}</label>
        <input type="radio" id="radio${num+j}" name="${num}" value="${arrMezcla[j]}"> 
        </div>` 

    }

    opciones.innerHTML = imprimir2

    
    validar(pregunta,num)  

     
}

let puntuacion = 0

function validar(pregunta,num) {
    
        document.querySelector('#espacioTotal').addEventListener('change', function (event) {
        
        event.preventDefault()
        console.log(event.target.value);
        let counter = 0
        
        console.log("Estoy por "+num);
        let selected = event.target.value;
        
        if (!selected) {
            alert('Selecciona una opción')
            
        }else if (selected == pregunta.correct_answer) {
            counter++ 
            puntuacion =  puntuacion + counter
        }
        console.log(counter, '1');
        //falta sumar contadores preguntas
    }) 
   
    
    return puntuacion
        
} 




function mezclarArray(arr) {
    
    for (let i = arr.length - 1; i >= 0; i--) {
          const s = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[s]] = [arr[s], arr[i]];
          
    }
}


