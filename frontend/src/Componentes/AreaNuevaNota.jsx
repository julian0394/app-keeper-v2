import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const axios = require('axios').default;

const AreaNuevaNota = (props) => {
  //State de los input ingresados ne la nueva nota
  const [input, setInput] = useState({
    titulo: '',
    contenido: '',
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

  const manejoClickSubmit = async (event) => {
    try {
      event.preventDefault();
      console.log('nota enviada al backend');
      
      const resultado = await axios.post('http://localhost:3030/notas/nueva', { 
        tituloNota: input.titulo,
        cuerpoNota: input.contenido,
        ID_usuario: props.usuarioActivo.ID_usuario
      });

      console.log('RESULTADO DESDE EL FRONT', resultado); /* falta validar inputs vacias (mas adelante con dependencias) */
    }
    catch (error) {
      console.log('error J en front', error);
    }
    
        /* FUNCIONALIDAD NORMAL DE LISTADO DE NOTAS!
            // event.preventDefault();
            // props.setearNota(input);
            // setInput( {
            //   titulo: '', 
            //   contenido: ''} 
            // );
        */
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
          <FontAwesomeIcon className="btn-agregar" icon={faPlus} />
        </button>
      </form>
    </div>
  );
}
 
export default AreaNuevaNota;