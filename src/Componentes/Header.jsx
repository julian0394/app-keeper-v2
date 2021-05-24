import React from 'react';
import '../estilosComponentes/header.css';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';

function Header(props) {
    
    function manejoCierreSesion(evento) {
        evento.preventDefault();
        props.cambioRuta('login');
    }

    return (
        <header>
            <h1 className="no-seleccionable"><EmojiObjectsIcon /> Keeper</h1>
            {props.ruta === 'notas' && <a onClick={manejoCierreSesion} href="">Cerrar sesión</a>} 
        </header>
    );
}

export default Header;
 