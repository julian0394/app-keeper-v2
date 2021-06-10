import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

const Nota = (props) => {
  return (
    <div className="nota">
      <h1>{props.titulo}</h1>
      <p>{props.contenido}</p>
      <div className="tooltip" >
        <button onClick={ () => {props.btnBorrar(props.id)} } >
          <FontAwesomeIcon className="btn-nota btn-borrar" icon={faTrash} />
        <p className="texto-tooltip">Borrar</p>
        </button>
      </div>
        
        
        <div className="tooltip">
          <button onClick={ () => {props.btnBorrar(props.id)} } >
            <FontAwesomeIcon className="btn-nota btn-editar" icon={faEdit} />
          <p className="texto-tooltip">Editar</p>
          </button>
        </div>
    </div>
  );
}

export default Nota;    