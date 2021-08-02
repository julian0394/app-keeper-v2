import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const axios = require('axios').default;

const Modal = (props) => {

  // State del input
  const [input, setInput] = useState({
    titulo: props.notaParaEditar.tituloNota,
    contenido: props.notaParaEditar.cuerpoNota,
  });

  const manejoCambioInput = evento => {
    const {name, value} = evento.target;
    
    setInput( valorPrevio => {
      return {
        ...valorPrevio,
        [name]: value,  // Name va entre [] para que sepa que debe tomar el argumento de la funcion
      }
    });
  }

  const manejoClickEditar = async (event) => {
    event.preventDefault();
    try {
      const notaEditada = { 
        tituloNota: input.titulo,
        cuerpoNota: input.contenido,
        ID_nota: props.notaParaEditar.ID_nota,
      }
      await axios.post('http://localhost:3030/notas/editar', notaEditada);

      await props.buscarNotasEnDB();

      await props.toggleModoEdicion();
      /* falta validar inputs vacias (mas adelante con dependencias) */
    } catch (error) {
      console.log('Error J al editar nota', error);
    }
  }

  return (
    <div className="modal">
      <div onClick={props.toggleModoEdicion} className="overlay" />
      <div className="contenido-modal">
        <h2>Editar nota :)</h2>

        <button className="btn-cerrar-modal" onClick={props.toggleModoEdicion}> X </button>

        <form className="crear-nota">
          <input 
            onChange={manejoCambioInput}
            value={input.titulo}
            defaultValue={props.notaParaEditar.tituloNota}
            className="tituloNuevaNota" 
            name="titulo" 
            placeholder="Título"
          />
          <textarea 
            onChange={manejoCambioInput}
            value={input.contenido}
            defaultValue={props.notaParaEditar.cuerpoNota}
            name="contenido" 
            placeholder="Escriba una nota..." 
            rows="3"
          />
          <button className="btn-agregar no-seleccionable" type="submit" onClick={manejoClickEditar}>
            <FontAwesomeIcon className="btn-agregar" icon={faCheck} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Modal;