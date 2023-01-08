const firebaseConfig = {
  apiKey: "AIzaSyDn9yTVECEBbcGdVrHFSsq52iWlucrlCUc",
  authDomain: "quiz-ii-61c29.firebaseapp.com",
  projectId: "quiz-ii-61c29",
  storageBucket: "quiz-ii-61c29.appspot.com",
  messagingSenderId: "809325604160",
  appId: "1:809325604160:web:b972fa210671931f6a5ea5"
};

firebase.initializeApp(firebaseConfig);// Inicializaar app Firebase

const db = firebase.firestore();// db representa mi BBDD //inicia Firestore


if (document.title == "Hoja de preguntas") {
  async function getQuestions() {
    let resultado = await fetch("https://opentdb.com/api.php?amount=10");
    let dataBase = await resultado.json();
    const preguntas = dataBase.results;

    return preguntas;
  }

  async function init() {
    let pregunta = await getQuestions();
    let num = 0;
    nextQuestion(pregunta[num], num);
    num = 1;
    console.log(pregunta);
    document.querySelector("#btn").addEventListener("click", () => {
      nextQuestion(pregunta[num], num);
      num++;
      //console.log(num,'num++')
    });
  
  }

  init();
  async function nextQuestion(pregunta, num) {
    let espacio = document.querySelector("#espacioPregunta");
    let opciones = document.querySelector("#opciones");
    //console.log(num,'27');

    if (num <= 9) {
      espacio.innerHTML = `<div>
      <legend id='legend${num}'>${pregunta.question}</legend>
      </div>`;

      let arrMezcla = [];
      correcta = [pregunta.correct_answer];
      incorrectas = pregunta.incorrect_answers;
      arrMezcla = correcta.concat(incorrectas);

      mezclarArray(arrMezcla);
      //console.log(arrMezcla);

      let imprimir2 = "";

      for (let j = 0; j < arrMezcla.length; j++) {
        imprimir2 += `<div id="formatoRespuestas">
          <input type="radio" id="radio${num + j}" name="${num}" value="${
          arrMezcla[j]
        }"> 
          <label for="radio${num +j}">${arrMezcla[j]}</label>
          </div>`;
      }

      opciones.innerHTML = imprimir2;
<<<<<<< HEAD
    } else{
      document.querySelector("#btn").setAttribute("value","Check your results!")
      document.querySelector("#btn").addEventListener("click", () => {
        
        window.location.href = "./results.html";
      })


      //window.location.href = "./results.html";
=======
    } else {
      window.location.href = "./results.html";
>>>>>>> 7c0dc576562e8a1092e46dac0a3549114330fb96
    }
    validar(pregunta, num);
  }

  let puntuacion = 0;
  let today = new Date().toLocaleString();
  
  /* let arrayDatos = []
  localStorage.setItem('partida', JSON.stringify(arrayDatos)) */

  function validar(pregunta, num) {
    document
      .querySelector("#espacioTotal")
      .addEventListener("change", function (event) {
        event.preventDefault();
        //console.log(event.target.value);
        //let counter = 0;

        console.log("Estoy por "+ num);
        let selected = event.target.value;

        if (selected === pregunta.correct_answer) {
          puntuacion++
          
          console.log(puntuacion,'puntuacion')
          
        }
      
      });
    //console.log(num)
<<<<<<< HEAD
      if (num == 10) {
        addFirestore(today, puntuacion)
=======
    if (num == 10) {
      console.log(puntuacion, "puntuacion num10");
>>>>>>> 7c0dc576562e8a1092e46dac0a3549114330fb96

      };
    
      //Local storage
      /* 
      tiene que ir dentro del if 
      console.log(puntuacion, "puntuacion num10");
      
      let user = {
        score: puntuacion,
        date: today,
      };
      let nuevoDato = JSON.parse(localStorage.getItem("partida")) || [];
      //console.log(nuevoDato, '1')
      nuevoDato.unshift(user);
      //console.log(nuevoDato,'2')
      arrayDatos = JSON.stringify(nuevoDato);
<<<<<<< HEAD
      localStorage.setItem("partida", arrayDatos); 
      }
      
    */
      
    //return puntuacion;
      
    }
    
    
=======
      localStorage.setItem("partida", arrayDatos);

      guardarPartida(today,puntuacion)
    }

    //return puntuacion;
>>>>>>> 7c0dc576562e8a1092e46dac0a3549114330fb96
  }

  function mezclarArray(arr) {
    for (let i = arr.length - 1; i >= 0; i--) {
      const s = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[s]] = [arr[s], arr[i]];
    }
  }

  function addFirestore(today, puntuacion) {
    return db.collection("score").add({
      
      date: today,
      score: puntuacion,
      
    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    
      
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  let arrFechas = [];
  let arrPuntuaciones = [];

  function getFirestore() {
      return db.collection("score").orderBy("date").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data().score} => ${doc.data().date}`);
          
          arrPuntuaciones.push(doc.data().score);
          let fechas = doc.data().date;
          //fechas = fechas.substring(0, 6);
          arrFechas.push(fechas);
          

          console.log(arrPuntuaciones);
          console.log(arrFechas);

          document.getElementById(
            "datosguardados"
          ).innerHTML = `<div>${doc.data().score}/10</div>`;
      });
      new Chartist.Bar(
        "#puntuaciones",
        {
          labels: arrFechas,
          series: [arrPuntuaciones],
        },
        {
          width: 400,
          height: 330,
          horizontalBars: true,
          //seriesBarDistance: 5,
          axisX: {
            offset: 10,
            onlyInteger: true,
          },
          axisY: {
            onlyInteger: true,
            offset: 160,
            labelInterpolationFnc: function (value) {
              return value + "";
            },
          },
        }
      ).on("draw", function (data) {
        if (data.type === "bar") {
          data.element.attr({
            style: "stroke-width: 10px",
          });
        }
      });
  });

    
  };

//GRÁFICA
if (document.title == "Results") {

  getFirestore()

  
  
  //Sacar puntuacion de local storage y grafica
  /* let puntuacionTotal = JSON.parse(localStorage.getItem("partida"));
  console.log(puntuacionTotal);
  
  document.getElementById(
    "datosguardados"
  ).innerHTML = `<div>${puntuacionTotal[0].score}/10</div>`;
  
  let arrFechas = [];
  let arrPuntuaciones = [];
  for (let i = 0; i < puntuacionTotal.length; i++) {
    
    arrPuntuaciones.push(puntuacionTotal[i].score);
    
    let fechas = puntuacionTotal[i].date;
    //fechas = fechas.substring(0, 4);
    //fechas = parseInt(fechas);
    arrFechas.push(fechas);
  }
    new Chartist.Bar(
      "#puntuaciones",
      {
        labels: arrFechas,
        series: [arrPuntuaciones],
      },
      {
        width: 350,
        height: 250,
        horizontalBars: true,
        //seriesBarDistance: 5,
        axisX: {
          offset: 10,
          onlyInteger: true,
        },
        axisY: {
          onlyInteger: true,
          offset: 80,
          labelInterpolationFnc: function (value) {
            return value + "";
          },
        },
      }
    ).on("draw", function (data) {
      if (data.type === "bar") {
        data.element.attr({
          style: "stroke-width: 10px",
        });
      }
    });*/
  
  //Lleva a home
  const botonDelete = document.querySelector("#btnResults");
  botonDelete.onclick = () => {
    //localStorage.clear()
    window.location.href = "./index.html";
<<<<<<< HEAD
  }; 



=======
  };
}

//FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyDn9yTVECEBbcGdVrHFSsq52iWlucrlCUc",
  authDomain: "quiz-ii-61c29.firebaseapp.com",
  projectId: "quiz-ii-61c29",
  storageBucket: "quiz-ii-61c29.appspot.com",
  messagingSenderId: "809325604160",
  appId: "1:809325604160:web:b972fa210671931f6a5ea5"
};

firebase.initializeApp(firebaseConfig);// Inicializaar app Firebase

const db = firebase.firestore();// db representa mi BBDD //inicia Firestore


function guardarPartida(today,puntuacion) {
  return db.collection("score").add({
    date: today,
    score: puntuacion,
    
  })
  .then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
  })
  .catch((error) => {
    console.error("Error adding document: ", error);
  });
}

function obtenerPartida() {
  db.collection("score").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);//arrays graficas
    });
});
>>>>>>> 7c0dc576562e8a1092e46dac0a3549114330fb96
}