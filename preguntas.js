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

// Initialize Firebase Authentication and get a reference to the service
const auth = firebase.auth();


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
    } else{
      document.querySelector("#btn").setAttribute("value","Check your results!")
      document.querySelector("#btn").addEventListener("click", () => {
        
        window.location.href = "./results.html";
      })


      //window.location.href = "./results.html";
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
      if (num == 10) {
        addFirestore(today, puntuacion)

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
      localStorage.setItem("partida", arrayDatos); 
      }
      
    */
      
    //return puntuacion;
      
    }
    
    
  }

  function mezclarArray(arr) {
    for (let i = arr.length - 1; i >= 0; i--) {
      const s = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[s]] = [arr[s], arr[i]];
    }
  }

  function addFirestore(today, puntuacion) {
    
    auth.onAuthStateChanged(user => {
      if(user){
          console.log('auth: log in');
          console.log(user);
          
           
          db.collection("score").add(
            {
            
            email: user.email,
            date: today,
            score: puntuacion,
            
          })
          .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
          
            
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
          });
         
          

          
      }else{
           console.log('log out');
          return db.collection("score").add({

            
            date: today,
            score: puntuacion,
            
          })
          .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
          
            
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
          })
          
      }})
    }
  
  let arrFechas = [];
  let arrPuntuaciones = [];
  let arrData = [];

  function getFirestore() {
    auth.onAuthStateChanged(user => {
      if(user){
        return db.collection("score").where("email", "==", user.email).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            //console.log(`${doc.id} => ${doc.data().score} => ${doc.data().date}`);
            console.log(doc.data());

            arrData.push(doc.data());
            
        });
       
        const sortByDate = arr => {
          const sorter = (a, b) => {
             return new Date(b.date).getTime() - new Date(a.date).getTime();
          }
          arr.sort(sorter);
       };
       sortByDate(arrData);
       console.log(arrData);
        
       arrData.forEach((data) => {
        arrPuntuaciones.unshift(data.date)
        arrFechas.unshift(data.score)
       })

       console.log(arrPuntuaciones);
       console.log(arrFechas);
        
        
        

        //console.log(arrPuntuaciones);
        //console.log(arrFechas);

         document.getElementById(
          "datosguardados"
        ).innerHTML = `<div>${arrData[0].score}/10</div>`; 

        new Chartist.Bar(
          "#puntuaciones",
          {
            labels: arrPuntuaciones,
            series: [arrFechas],
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
    

      }else{
        return db.collection("score").get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              //console.log(`${doc.id} => ${doc.data().score} => ${doc.data().date}`);
              console.log(doc.data());

              arrData.push(doc.data());
              
          });
         
          const sortByDate = arr => {
            const sorter = (a, b) => {
               return new Date(b.date).getTime() - new Date(a.date).getTime();
            }
            arr.sort(sorter);
         };
         sortByDate(arrData);
         console.log(arrData);
          
         arrData.forEach((data) => {
          arrPuntuaciones.unshift(data.date)
          arrFechas.unshift(data.score)
         })

         console.log(arrPuntuaciones);
         console.log(arrFechas);
          
          
          

          //console.log(arrPuntuaciones);
          //console.log(arrFechas);

           document.getElementById(
            "datosguardados"
          ).innerHTML = `<div>${arrData[0].score}/10</div>`; 

          new Chartist.Bar(
            "#puntuaciones",
            {
              labels: arrPuntuaciones,
              series: [arrFechas],
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
    
      }
    })

      
    
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
  }; 



}

if (document.title =='Login') {
  
  const signInForm = document.querySelector('#sign-form');

  signInForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.querySelector("#sign-email").value;
    const password = document.querySelector("#sign-pass").value;

    auth
        .createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            signInForm.reset();

            console.log('sign in');
        })
});

//Log In 

  const logInForm = document.querySelector("#login-form");

  logInForm.addEventListener("submit", (e)=> {
    e.preventDefault();

    const email = document.querySelector("#login-email").value;
    const password = document.querySelector("#login-pass").value;

    auth
        .signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            signInForm.reset();

            console.log('log in');
        })
})

//Log Out
const logOut = document.querySelector("#log_out");

logOut.addEventListener("click", e => {
    e.preventDefault();
    auth
        .signOut()
        .then(() => {
            console.log('log out');
        })
})



}