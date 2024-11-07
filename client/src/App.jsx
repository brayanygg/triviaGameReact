import { useState } from "react";
import "./App.css";

function App() {
  const [isMenuActive, setIsMenuActive] = useState(true);

  let arr = [
    <button className="boton_general" key={1}>
      respuesta
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
  const menuOff = () => {
    setIsMenuActive(false);
  };

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
      <section className={"inactive"}>
        <img src="./src/assets/ajedrez.png" alt="ajedrez" />
        <p className="pregunta">
          quetion: placeholder para preguntas que no va a ser definitivo
        </p>
        <div className="zona_respuestas">{arr.map((boton) => boton)}</div>
      </section>
      <section className="zona_final">
        <p className="terminado">Juego terminado</p>
        <p className="puntuaciones">Puntaje: 100</p>
        <p className="max puntuaciones">Maximo puntaje: 500</p>
        <button className="boton_restaurar">X</button>
        <button className="volver boton_general">Volver a inicio</button>
      </section>
    </main>
  );
}

export default App;
