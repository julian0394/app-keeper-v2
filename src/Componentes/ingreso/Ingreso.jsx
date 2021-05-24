import React from 'react';
import Login from './Login';
import Registro from './Registro';
import '../../estilosComponentes/ingreso.css';

const Ingreso = (props) => {

    function alCambiarRuta(evento, nuevaRuta) {
        evento.preventDefault();
        props.cambioRuta(nuevaRuta);
    }
 
    return (  
        <div className="contenedor-ingreso">
            {props.ruta === 'login' 
                ? <Login 
                        ruta={props.ruta} 
                        cambioRuta={props.cambioRuta}
                        alCambiarRuta={alCambiarRuta} 
                        instanciarUsuario={props.instanciarUsuario}
                    /> 
                : props.ruta === 'registro' && 
                    <Registro 
                        ruta={props.ruta} 
                        cambioRuta={props.cambioRuta} 
                        alCambiarRuta={alCambiarRuta} 
                    />
            }
        </div>
    );
}
 
export default Ingreso;