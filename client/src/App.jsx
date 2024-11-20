import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [isMenuActive, setIsMenuActive] = useState(true);
  const [preguntas, setPreguntas] = useState(null);
  const [botonDesactivado, setBotonDesactivado] = useState(true);
  const [count, setCount] = useState(0);

  const traerPreguntas = async () => {
    try {
      const respuesta = await axios.get("http://localhost:5000/preguntas");
      setPreguntas(respuesta.data);
    } catch (error) {
      console.log(error);
    }
  };

  const aleatorizarPreguntas = () => {
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
    setTimeout(() => {
      setBotonDesactivado(false);
    }, 2000);
  }, []);

  const menuOff = () => {
    setIsMenuActive(false);
  };

  const procesosPreguntas = () => {
    aleatorizarPreguntas();
    menuOff();
  };

  const revision = (respuesta, correcta) => {
    respuesta == correcta ? console.log("correcta") : console.log("incorrecto");

    if (preguntas.length - 1 > count) {
      console.log("youre inside");

      setCount(count + 1);
    }
    console.log(count);
  };

  return (
    <main className="screen">
      <section className={isMenuActive ? "menu" : "inactive"}>
        <h1>TriviaGame</h1>
        {botonDesactivado ? (
          <div>Cargando...</div>
        ) : (
          <button className="boton_general" onClick={procesosPreguntas}>
            Jugar!
          </button>
        )}
      </section>

      <section className={isMenuActive ? "inactive" : "zona_preguntas"}>
        {console.log(count)}
        {preguntas ? (
          <div key={preguntas[count]._id}>
            <img src={preguntas[count].imgRoute} alt={preguntas[count]._id} />
            <p className="pregunta">{preguntas[count].pregunta}</p>
            <div className="zona_respuestas">
              {preguntas[count].respuestas.map((button, index) => (
                <button
                  onClick={() => revision(button, preguntas[count].verdadera)}
                  className="boton_general"
                  key={index}
                >
                  {button}
                </button>
              ))}
            </div>
          </div>
        ) : (
          ""
        )}
        {/* {preguntas.map((pregunta) => (
          <div key={pregunta._id}>
            <img src={pregunta.imgRoute} alt={pregunta._id} />
            <p className="pregunta">{pregunta.pregunta}</p>
            <div className="zona_respuestas">
              {pregunta.respuestas.map((button, index) => (
                <button className="boton_general" key={index}>
                  {button}
                </button>
              ))}
            </div>
          </div>
        ))} */}
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
