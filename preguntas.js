
async function getQuestions() {
    let resultado = await fetch("https://opentdb.com/api.php?amount=10");
    let dataBase = await resultado.json();
    const preguntas = dataBase.results;
    const pregunta = await preguntas.map(element => element.question);
    const correcta = await preguntas.map(element => element.correct_answer);
    const incorrectas = await preguntas.map(element => element.incorrect_answers);

    const questions = 
        {
            pregunta,
            correcta,
            incorrectas,
        }

    return questions
}

/* getQuestions()
    .then(questions => { printQuestion(questions)})
    .catch(error=> alert(error)) */

function printQuestion(questions) {
    // console.log(questions)
    // console.log(questions.correcta);
    // console.log(questions.incorrectas);
    let arrMezcla = [];
    let shuffledArray = [];
    let correctas = []
    let incorrectas = []

    for (let i = 0; i < questions.pregunta.length; i++) {

        correctas = [questions.correcta[i]]
        incorrectas = questions.incorrectas[i]
        arrMezcla[i] = correctas.concat(incorrectas)
    }
    console.log(arrMezcla);
    
    //he creado el div espacioPregunta en el html porque necesito una separacion para crear el boton

    let imprimir = ''
    let imprimir2 = ''
  
   
    for (let i = 0; i < 1; i++) {
        imprimir =  `<div>
        <legend id=''${i}>${questions.pregunta[i]}</legend>
        </div>`  

        for (let j = 0; j < arrMezcla[i].length; j++) {
            imprimir2 +=
            `<div>
            <label for="">${arrMezcla[i][j]}</label>
            <input type="radio" id="" name="${j}" value="${arrMezcla[j]}"> 
            </div>` //cambiar name 
    
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
    }  */
    
}


//document.querySelector('#btn').addEventListener('click',printQuestion())








