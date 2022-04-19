import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const axios = require('axios').default;

const AreaNuevaNota = (props) => {
  
  const inputDefault = {
    titulo: '',
    contenido: '',
  }

  // State de los input ingresados en la nueva nota
  const [input, setInput] = useState(inputDefault);

  const manejoCambioInput = evento => {
    const {name, value} = evento.target;
    
    setInput( valorPrevio => {
      return {
        ...valorPrevio,
        [name]: value,  // Name va entre [] para que sepa que debe tomar el argumento de la funcion
      }
    });

    // setContador( input.contenido.length )
  }

  // State del contador de caracteres de nueva nota
  const [contador, setContador] = useState(0);

  // State para alert si rompen el boton de enviar con cadena mas larga
  const [errorLargo, setErrorLargo] = useState(false);

  // Usado para agregar una nueva nota
  const manejoClickNuevo = async (event) => {
    try {
      event.preventDefault();
      
      const nuevaNota = { 
        tituloNota: input.titulo,
        cuerpoNota: input.contenido,
        ID_usuario: props.usuarioActivo.ID_usuario
      }
      await axios.post(process.env.API_PATH + '/notas/nueva', nuevaNota);

      await props.buscarNotasEnDB();

      setInput(inputDefault);

      await props.editarDatoNota('suma');
      /* falta validar inputs vacias (mas adelante con dependencias) */
    }
    // catch (error-largo) {
    //   alert('rompiste el boton e intentaste mandarlo igualmente?! Mala gente..')
    // }
    catch (error) {
      console.log('error J al crear nota', error);
    }
  }

  useEffect( () => {
    setContador( input.contenido.length );
  }, [input] );
   
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
        <p className={`contadorPalabras ${ contador > 40 && 'contador-excedido' }`} > {contador}/40 </p>
        <button className={`btn-agregar no-seleccionable ${contador > 40 && 'btn-anulado'}`} type="submit" onClick={manejoClickNuevo}>
          <FontAwesomeIcon className="btn-agregar" icon={faPlus} />
        </button>
      </form>
    </div>
  );
}
 
export default AreaNuevaNota;