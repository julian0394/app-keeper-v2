import React, { useState } from 'react';
import InputFormulario from './InputFormulario';
import './icono-error.png';

const axios = require('axios').default;

const Login = (props) => {
  /* Objeto de login vacio para referenciar facil cuando se quiera poner en blanco */
  const defaultLogin = {
    usuario: '',
    password: '',
  };
  
  // RECIBE EL STATE DEL INPUT INDIVIDUAL, LO ALMACENA Y luego LO MANDA AL SERVER
  const [login, setLogin] = useState(defaultLogin);

  const cambioLogin = (name, value) => {
    setLogin( loginPrevio => {
      return {
        ...loginPrevio,
        [name]: value,  // Name va entre [] para que sepa que debe tomar el argumento de la funcion
      }
    })
  }

  const manejoClickLogin = async (event) => {
    try {
      event.preventDefault();
      console.log('usuario enviado al backend');
      
      const resultado = await axios.post('http://localhost:3030/login', { 
        nombreUsuario: login.usuario.trim(),
        passUsuario: login.password
      });
      
      if( props.buscarPropiedadVacia(login) ) {
        if( resultado.data.length === 0 )  /* Si el array está vacio significa que no trajo/encontró nada */
          await props.setInputIncorrecto(1); /* Mje que no hubo coincidencias */
        else {
          await props.setUsuarioActivo(resultado.data); 
          await setLogin(defaultLogin); /* Vuelve los campos a cero */
          await props.setInputIncorrecto(0);
          await props.cambioRuta('notas');
        }
      }
      else 
        await props.setInputIncorrecto(2); /* Mje que hubo campos vacios */
    } 
    catch (error) {
      console.log('error J en front', error);
    }
  }

  return (
    <>
      <h1>Inicio de sesión</h1>
      <form action="post">
        <InputFormulario 
          tipo="text" 
          nombre="usuario" 
          textoLabel="Usuario" 
          alCambiarInput={cambioLogin} 
          noValidate
        />
        <InputFormulario 
          tipo="password" 
          nombre="password" 
          textoLabel="Contraseña" 
          alCambiarInput={cambioLogin}
        />
        
        {props.inputIncorrecto === 1 && <p className="incorrecto">El usuario o contraseña no coinciden</p>}
        {props.inputIncorrecto === 2 && <p className="incorrecto">No se aceptan campos vacios</p>}
        
        <button onClick={manejoClickLogin}>Ingresar</button>
      </form>
      <p className="registroEInicio">No tienes una cuenta? 
        <a href="./register" onClick={ (evento) => props.alCambiarRuta(evento, 'registro')}> Registrate!</a>
      </p>            
    </>
  )
}
 
export default Login;