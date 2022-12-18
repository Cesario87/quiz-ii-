async function printQuestions() {
    let resultado = await fetch("https://opentdb.com/api.php?amount=10");
    let dataBase = await resultado.json();
    const preguntas = dataBase.results;
    const arrPreguntas = preguntas.map(element => element.question);
    
   // window.prueba.innerHTML = arrPreguntas;
    
    const questions = [
        {
            "question": arrPreguntas,
        
        }
    ]
    for (let i = 0; i < arrPreguntas.length; i++) {
        const division = document.createElement("div");
        document.getElementById("prueba").appendChild(division);
        division.innerHTML = questions[0].question[i];
    }
    
}
printQuestions()



