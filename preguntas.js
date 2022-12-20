
async function getQuestions() {
    let resultado = await fetch("https://opentdb.com/api.php?amount=10");
    let dataBase = await resultado.json();
    const preguntas = dataBase.results;
    const pregunta = await preguntas.map(element => element.question);
    const correcta = await preguntas.map(element => element.correct_answer);
    const incorrectas = await preguntas.map(element => element.incorrect_answers);

    let arrMezcla = [...correcta, ...incorrectas[0]];//para validacion comparar con question.correcta
    let shuffledArray = arrMezcla.sort(() => Math.random() - 0.5);

    const questions = 
        {
            pregunta,
            shuffledArray,
        }
    

    return questions
    
    
}

getQuestions()
    .then(questions => printQuestion(questions))
    .catch(error=> alert(error))

function printQuestion(questions) {
    console.log(questions)
    
    //he creado el div espacioPregunta en el html porque necesito una separacion para crear el boton

    let imprimir = ''
    let i = 1
    
    imprimir =  `<div>
    <legend id='espacioPregunta'${i}>${questions.pregunta}</legend>
    <label for="">${questions.shuffledArray}</label>
    <input type="radio" id="" name="${i}" value="${questions.shuffledArray}">
    <label for="">${questions.shuffledArray}</label>
    <input type="radio" id="" name="${i}" value="${questions.shuffledArray}">
    <label for="">${questions.shuffledArray}</label>
    <input type="radio" id="" name="${i}" value="${questions.shuffledArray}">
    <label for="">${questions.shuffledArray}</label>
    <input type="radio" id="" name="${i}" value="${questions.shuffledArray}">
    </div>`
    

     
    
    document.querySelector('#espacioPregunta').innerHTML = imprimir


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


printQuestion()







