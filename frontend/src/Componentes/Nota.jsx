import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

const axios = require('axios').default;

const Nota = (props) => {
  
  const manejoBotonBorrar = async () => {
    try {
      console.log('borrando..');
      const idBorrar = await props.id;
      console.log('id a borrar: ', idBorrar);
      await axios.post('http://localhost:3030/notas/borrar', {ID_nota: idBorrar});
      console.log('borrado!');
      
      await props.buscarNotasEnDB();
    } catch {
      console.log('Error J en front')
    }
  }

  return (
    <div className="nota">
      <h1>{props.titulo}</h1>
      <p>{props.contenido}</p>
      <div className="tooltip" >
        <button onClick={manejoBotonBorrar} >
          <FontAwesomeIcon className="btn-nota btn-borrar" icon={faTrash} />
        <p className="texto-tooltip">Borrar</p>
        </button>
      </div>
        
        
        <div className="tooltip">
          <button /*onClick={ () => {props.btnBorrar(props.id)} }*/ >
            <FontAwesomeIcon className="btn-nota btn-editar" icon={faEdit} />
          <p className="texto-tooltip">Editar</p>
          </button>
        </div>
    </div>
  );
}

export default Nota;    