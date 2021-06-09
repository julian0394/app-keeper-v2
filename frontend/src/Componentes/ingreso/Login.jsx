import React, { useState } from 'react';
import InputFormulario from './InputFormulario';
import './icono-error.png';

const axios = require('axios').default;

function Login(props) {
  // RECIBE EL STATE DEL INPUT INDIVIDUAL, LO ALMACENA Y luego LO MANDA AL SERVER
  const defaultLogin = {
    usuario: '',
    password: '',
  };

  const [login, setLogin] = useState(defaultLogin);

  function cambioLogin(name, value) {
    setLogin( loginPrevio => {
      return {
        ...loginPrevio,
        [name]: value,  // Name va entre [] para que sepa que debe tomar el argumento de la funcion
      }
    })
  }

  async function manejoClickLogin(event) {
    try {
      event.preventDefault();
      console.log('usuario enviado al backend');
      
      const resultado = await axios.post('http://localhost:3030/login', { 
        nombreUsuario: login.usuario,
        passUsuario: login.password
      });
      
      if( props.buscarPropiedadVacia(login) ) {
        if( resultado.data.length === 0 )  /* Si es 0 (array vacio) significa que no trajo nada */
          await props.setInputIncorrecto(1); /* No hubo coincidencias */
        else {
          await props.setUsuarioActivo(resultado.data);
          await setLogin(defaultLogin); /* Vuelve los campos a cero */
          await props.setInputIncorrecto(0);
          await props.cambioRuta('notas');
        }
      }
      else 
        await props.setInputIncorrecto(2);
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
        
        {props.inputIncorrecto === 1 && <p className="incorrecto">El usuario y contraseña no coinciden</p>}
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