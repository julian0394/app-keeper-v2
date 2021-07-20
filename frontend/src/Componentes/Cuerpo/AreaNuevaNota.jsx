import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';

const axios = require('axios').default;

const AreaNuevaNota = (props) => {
  
  const inputDefault = {
    titulo: '',
    contenido: '',
  }
  
  //State de los input ingresados ne la nueva nota
  const [input, setInput] = useState(inputDefault);

  const manejoCambioInput = evento => {
    const {name, value} = evento.target;
    
    setInput( valorPrevio => {
      return {
        ...valorPrevio,
        [name]: value,  // Name va entre [] para que sepa que debe tomar el argumento de la funcion
      }
    });
  }

  try {
    if (props.modoEdicion) {
      const viejaNota = {
        titulo: props.notaParaEditar.tituloNota,
        contenido: props.notaParaEditar.cuerpoNota
      }
      setInput(viejaNota);
    }
  }
  catch {
    console.log('"error" nuevo');
    console.log(props.listaNotas);
  }

  const manejoClickSubmit = async (event) => {
    try {
      event.preventDefault();
      
      const nuevaNota = { 
        tituloNota: input.titulo,
        cuerpoNota: input.contenido,
        ID_usuario: props.usuarioActivo.ID_usuario
      }
      await axios.post('http://localhost:3030/notas/nueva', nuevaNota);

      await props.buscarNotasEnDB();

      setInput(inputDefault);
      /* falta validar inputs vacias (mas adelante con dependencias) */
    }
    catch (error) {
      console.log('error J al crear nota', error);
    }
  }
    
  return ( 
    <div className="contenedor-nueva-nota">
      <form className="crear-nota">
        <input 
          onChange={manejoCambioInput}
          value={input.titulo}
          className="tituloNuevaNota" 
          name="titulo" 
          placeholder="Título"
        />
        <textarea 
          onChange={manejoCambioInput}
          value={input.contenido}
          name="contenido" 
          placeholder="Escriba una nota..." 
          rows="3"
        />
        <button 
          className="btn-agregar no-seleccionable"
          type="submit"
          onClick={manejoClickSubmit}
        >
          <FontAwesomeIcon className="btn-agregar" icon={props.modoEdicion ? faCheck : faPlus} />
        </button>
      </form>
    </div>
  );
}
 
export default AreaNuevaNota;