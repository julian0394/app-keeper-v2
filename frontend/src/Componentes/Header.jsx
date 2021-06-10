import React from 'react';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';

const Header = (props) => {
    
  const manejoCierreSesion = evento => {
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
 