import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faInfoCircle, faSignOutAlt /*, faCaretDown*/ } from '@fortawesome/free-solid-svg-icons';
import sinFoto from '../usuario-sin-foto.png';

const Header = (props) => {
    
  const manejoCierreSesion = evento => {
    evento.preventDefault();
    props.setUsuarioActivo({});
    props.setListaNotas([]);
    props.cambioRuta('login');
  }

  const manejoBotonPerfil = () => {
    props.cambioRuta('perfil');
  }

  return (
    <div className="zona-header">
      <header>
        <h1 className="no-seleccionable"> <FontAwesomeIcon className="logo" icon={faLightbulb} /> Douge Notes </h1>
        { (props.ruta === 'notas' || props.ruta === 'perfil') && 
          <div className="usuario-header menu">
            
            <div className="tooltip">
              <img 
                className="foto-usuario no-seleccionable" 
                onClick={manejoBotonPerfil} 
                src={props.usuarioActivo.fotoUsuario === null ? sinFoto : props.usuarioActivo.fotoUsuario} 
                alt="Foto gris generica" 
              />
              <p className="texto-tooltip">Perfil</p>
            </div>
              
            <div className="tooltip">
              <FontAwesomeIcon 
                className="item" 
                icon={faInfoCircle} 
                onClick={ () => alert('Desarrollado por Juli Pérez - Github: julian0394') } 
              />
              <p className="texto-tooltip">Info</p>
            </div>
            
            <div className="tooltip">
              <FontAwesomeIcon className="item" icon={faSignOutAlt} onClick={manejoCierreSesion} />
              <p className="texto-tooltip">Salir</p>
            </div>
          
          </div>   
        }        
      </header>
    </div>
  );
}

export default Header;
 