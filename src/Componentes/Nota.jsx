import React from 'react';
import '../estilosComponentes/nota.css';
import DeleteIcon from '@material-ui/icons/Delete';

function Nota(props) {
    return (
        <div className="nota">
            <h1>{props.titulo}</h1>
            <p>{props.contenido}</p>
            <button onClick={ () => {
                props.btnBorrar(props.id);}}>
                <DeleteIcon />
            </button>
        </div>
    );
}

export default Nota;    