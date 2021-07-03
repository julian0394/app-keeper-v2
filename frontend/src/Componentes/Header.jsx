import React from 'react';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';

const Header = (props) => {
    
  const manejoCierreSesion = evento => {
    evento.preventDefault();
    props.setUsuarioActivo({});
    props.setListaNotas([]);
    props.cambioRuta('login');
  }

  return (
    <header>
      <h1 className="no-seleccionable"><EmojiObjectsIcon /> Keeper</h1>
      {props.ruta === 'notas' && <p onClick={manejoCierreSesion}>Cerrar sesión</p>} 
    </header>
  );
}

export default Header;
 