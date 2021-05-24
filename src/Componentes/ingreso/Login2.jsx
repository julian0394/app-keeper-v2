import React from 'react';
import '../../estilosComponentes/ingreso.css';
import InputFormulario from './InputFormulario';


const Login2 = (props) => {
    
    function manejoClickForm(evento, nuevaRuta) {
        evento.preventDefault();
        props.cambioRuta(nuevaRuta);
    }
 
    return (  
        <div className="contenedor-login">
            {props.ruta === 'login' ? <h1>Inicio de sesión</h1> : <h1>Registro de cuenta</h1>}
            <form action="post">
                <InputFormulario tipo="text" name="usuario" textoLabel="Usuario" />
                {props.ruta === 'registro' && <InputFormulario tipo="email" name="email" textoLabel="Mail ficticio" />}
                <InputFormulario tipo="password" name="contrasenia" textoLabel="Contraseña" />
                <button onClick={(evento) => manejoClickForm(evento, 'notas')}>{props.ruta === 'login' ? "Ingresar" : "Registrarse"}</button>
            </form>
            {props.ruta === 'login' ? 
                <p className="registro">No tienes una cuenta? <a onClick={(evento) => manejoClickForm(evento, 'registro')} href="">Registrate!</a></p> :
                <p className="registro">Ya tienes una cuenta? <a onClick={(evento) => manejoClickForm(evento, 'login')} href="">Ingresa!</a></p>
            } 
        </div>
    );
}
 
export default Login2;