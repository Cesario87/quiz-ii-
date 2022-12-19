
async function printQuestions() {
    let resultado = await fetch("https://opentdb.com/api.php?amount=1");
    let dataBase = await resultado.json();
    const preguntas = dataBase.results;
    const pregunta = preguntas.map(element => element.question);
    const correcta = preguntas.map(element => element.correct_answer);
    const arrIncorrectas = preguntas.map(element => element.incorrect_answers);

    const questions = [
        {
            "question": pregunta,
            "correcta": correcta,
            "incorrectas": arrIncorrectas,
        }
    ]

    let arrMezcla = [...correcta, ...arrIncorrectas[0]];//para validacion comparar con question.correcta
    let shuffledArray = arrMezcla.sort(() => Math.random() - 0.5);
    //he creado el div espacioPregunta en el html porque necesito una separacion para crear el boton
     const etiqueta = document.createElement("legend");
    document.getElementById("espacioPregunta").appendChild(etiqueta);
    etiqueta.innerHTML = questions[0].question;

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
        radio.setAttribute('name',`pregunta1`)//el name tambien deberia cambiar pero por bloque 
        radio.setAttribute('value', `${shuffledArray[j]}`)
        radio.type = "radio";
        division2.appendChild(radio);
    } 


}

printQuestions()


function borrar() {
   
    const borrar = document.getElementById('espacioPregunta')
    borrar.removeChild(borrar.firstChild)
    printQuestions()
}