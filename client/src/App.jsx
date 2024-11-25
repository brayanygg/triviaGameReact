import { useState, useEffect, useCallback } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [seccion, setSeccion] = useState("menu");
  const [preguntas, setPreguntas] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [count, setCount] = useState(0);
  const [vidas, setVidas] = useState(3);
  const [puntaje, setPuntaje] = useState(0);

  const aleatorizarPreguntas = useCallback((antePreguntas) => {
    antePreguntas.sort(() => Math.random() - 0.5);

    antePreguntas.forEach((pregunta) => {
      pregunta.respuestas.sort(() => Math.random() - 0.5);
    });

    setPreguntas(antePreguntas);
  }, []);

  const traerPreguntas = useCallback(async () => {
    try {
      const respuesta = await axios.get("http://localhost:5000/preguntas");
      aleatorizarPreguntas(respuesta.data);
    } catch (error) {
      console.error("Error al traer las preguntas", error);
    } finally {
      setCargando(false);
    }
  }, [aleatorizarPreguntas]);

  useEffect(() => {
    traerPreguntas();
  }, [traerPreguntas]);

  const menuOff = () => {
    setSeccion("zona_preguntas");
  };

  const finalOff = () => {
    setVidas(3);
    setCount(0);
    setPuntaje(0);
    aleatorizarPreguntas(preguntas);
    setSeccion("menu");
  };

  const revision = useCallback(
    (respuesta, correcta) => {
      setPuntaje((prevPuntaje) => {
        if (respuesta === correcta) {
          return prevPuntaje + 100;
        } else {
          setVidas((prevVidas) => {
            if (prevVidas === 1) {
              setSeccion("zona_final");
              return 0;
            } else {
              return prevVidas - 1;
            }
          });
          return prevPuntaje;
        }
      });
      setCount((prevCount) => {
        if (prevCount === preguntas.length - 1) {
          setSeccion("zona_final");
          return 0;
        } else {
          return prevCount + 1;
        }
      });
    },
    [preguntas]
  );

  const reiniciarMaxPuntaje = () => {
    setPuntaje(0);
  };

  return (
    <main className="screen">
      <section className={seccion == "menu" ? "menu" : "inactive"}>
        <h1>TriviaGame</h1>
        {cargando ? (
          <div>Cargando...</div>
        ) : (
          <button className="boton_general" onClick={menuOff}>
            Jugar!
          </button>
        )}
      </section>

      <section
        className={seccion == "zona_preguntas" ? "zona_preguntas" : "inactive"}
      >
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
        <div className="zona_numeros">
          <div className="zona_vidas">
            <span>❤️</span>
            <span>x{vidas}</span>
          </div>
          <div className="zona_puntuacion">
            <span>Puntuación: {puntaje}</span>
          </div>
        </div>
      </section>

      <section className={seccion == "zona_final" ? "zona_final" : "inactive"}>
        <p className="terminado">Juego terminado</p>
        <p className="puntuaciones">Puntaje: {puntaje}</p>
        <p className="max puntuaciones">Maximo puntaje: {puntaje}</p>
        <button onClick={reiniciarMaxPuntaje} className="boton_restaurar">
          X
        </button>
        <button onClick={finalOff} className="volver boton_general">
          Volver a inicio
        </button>
      </section>
    </main>
  );
}

export default App;
