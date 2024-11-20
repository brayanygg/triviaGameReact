import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [isMenuActive, setIsMenuActive] = useState(true);
  const [preguntas, setPreguntas] = useState([]);

  const traerPreguntas = async () => {
    try {
      const respuesta = await axios.get("http://localhost:5000/preguntas");
      setPreguntas(respuesta.data);
    } catch (error) {
      console.log(error);
    }
  };

  const aleatorizar = () => {
    const toRandom = [...preguntas];
    toRandom.sort(() => Math.random() - 0.5);
    setPreguntas(toRandom);

    preguntas.forEach((pregunta) => {
      pregunta.respuestas.sort(() => Math.random() - 0.5);
      console.log(pregunta.respuestas);
    });

    console.log("fin");
  };

  useEffect(() => {
    traerPreguntas();
  }, []);

  const menuOff = () => {
    setIsMenuActive(false);
  };

  let arr = [
    <button onClick={aleatorizar} className="boton_general" key={1}>
      hola
    </button>,
    <button className="boton_general" key={2}>
      falsa1
    </button>,
    <button className="boton_general" key={3}>
      falsa2
    </button>,
    <button className="boton_general" key={4}>
      falsa3
    </button>,
  ];

  return (
    <main className="screen">
      {/* <section className={isMenuActive ? "menu" : "inactive"}> */}
      <section className={"inactive"}>
        <h1>TriviaGame</h1>
        <button className="boton_general" onClick={menuOff}>
          Jugar!
        </button>
      </section>
      {/* <section className={isMenuActive ? "inactive" : "zona_preguntas"}> */}
      <section className={"zona_preguntas"}>
        <img src="./src/assets/ajedrez.png" alt="ajedrez" />
        <p className="pregunta">
          quetion: placeholder para preguntas que no va a ser definitivo
        </p>
        <div className="zona_respuestas">{arr.map((boton) => boton)}</div>
      </section>
      <section className="inactive">
        <p className="terminado">Juego terminado</p>
        <p className="puntuaciones">Puntaje: 100</p>
        <p className="max puntuaciones">Maximo puntaje: 600</p>
        <button className="boton_restaurar">X</button>
        <button className="volver boton_general">Volver a inicio</button>
      </section>
    </main>
  );
}

export default App;
