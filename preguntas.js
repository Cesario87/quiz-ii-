async function printQuestions() {
    let resultado = await fetch("https://opentdb.com/api.php?amount=1");
    let dataBase = await resultado.json();
    const preguntas = dataBase.results;
    const arrPreguntas = preguntas.map(element => element.question);
    const arrCorrectas = preguntas.map(element => element.correct_answer);
    const arrIncorrectas = preguntas.map(element => element.incorrect_answers);

    const questions = [
        {
            "question": arrPreguntas,
            "correcta": arrCorrectas,
            "incorrectas": arrIncorrectas
        }
    ]
    
    for (let i = 0; i < arrPreguntas.length; i++) {
        let arrMezcla = [arrCorrectas[i], ...arrIncorrectas[i]];
        let shuffledArray = arrMezcla.sort(() => Math.random() - 0.5);
        const division = document.createElement("div");
        document.getElementById("prueba").appendChild(division);
        division.setAttribute("id", "espacioPregunta");
        const etiqueta = document.createElement("legend");
        document.getElementById("espacioPregunta").appendChild(etiqueta);
        etiqueta.innerHTML = questions[i].question[i];

        for (let j = 0; j < arrMezcla.length; j++) {
        const division2 = document.createElement("div");
        document.getElementById("espacioPregunta").appendChild(division2);
        division2.id = `respuesta${[j]}`;
        const opciones = document.createElement("label");
        document.getElementById(`respuesta${[j]}`).appendChild(opciones);
        opciones.innerHTML = shuffledArray[j];
        const radio = document.createElement("input");
        radio.type = "radio";
        division2.appendChild(radio);

    }
    
}
}
printQuestions()