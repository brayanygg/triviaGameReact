import { useState } from "react";
import "./App.css";

function App() {
  const [isMenuActive, setIsMenuActive] = useState(true);

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

      {/* <section className={isMenuActive ? "inactive" : "question"}> */}
      <section className={"zona_preguntas"}>
        <img src="./src/assets/ajedrez.png" alt="ajedrez" />
        <p className="pregunta">
          quetion: placeholder para preguntas que no va a ser definitivo
        </p>
        <div className="zona_respuestas">
          <button className="boton_general">placeholder</button>
          <button className="boton_general">placeholder</button>
          <button className="boton_general">placeholder</button>
          <button className="boton_general">placeholder</button>
        </div>
      </section>
    </main>
  );
}

export default App;
