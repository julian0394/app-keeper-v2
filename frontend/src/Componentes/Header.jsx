import React, { /*useState*/ } from 'react';
// import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faInfoCircle, faSignOutAlt /*, faCaretDown*/ } from '@fortawesome/free-solid-svg-icons';
import sinFoto from '../usuario-sin-foto.png';

const Header = (props) => {
    
  // STATE PARA MANEJAR LA APERTURA DEL MENU DESPLEGABLE
  // const [menuAbierto, setMenuAbierto] = useState(false);

  // const abrirMenu = () => {
  //   setMenuAbierto(!menuAbierto);
  // }

  const manejoCierreSesion = evento => {
    evento.preventDefault();
    props.setUsuarioActivo({});
    props.setListaNotas([]);
    // setMenuAbierto(false);
    props.cambioRuta('login');
  }

  const manejoBotonPerfil = () => {
    props.cambioRuta('perfil');
  }

  return (
    <div className="zona-header">
      {/* VERSION ANTERIOR EN notas.js */}
      <header>
        <h1 className="no-seleccionable"> <FontAwesomeIcon className="logo" icon={faLightbulb} /> Keeper </h1>
        { (props.ruta === 'notas' || props.ruta === 'perfil') && 
          <div className="usuario-header menu">
            
            <div className="tooltip">
              <img className="foto-usuario" onClick={manejoBotonPerfil} src={sinFoto} alt="Foto gris generica" />
              <p className="texto-tooltip">Perfil</p>
            </div>
              
            <div className="tooltip">
              <FontAwesomeIcon className="item" icon={faInfoCircle} onClick={() => console.log('info')} />
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
 