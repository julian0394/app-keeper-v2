import React, {useState} from 'react';
import InputFormulario from './InputFormulario';
import './icono-error.png';
const axios = require('axios').default;

function Login(props) {
  // RECIBE EL STATE DEL INPUT INDIVIDUAL, LO ALMACENA Y luego LO MANDA AL SERVER
  const [login, setLogin] = useState({
    usuario: '',
    password: '',
  });

  function alCambiarLogin(name, value) {
    setLogin( loginPrevio => {
      return {
        ...loginPrevio,
        [name]: value,  // Name va entre [] para que sepa que debe tomar el argumento de la funcion
      }
    })
  }

  // STATE PARA MOSTRAR EL MENSAJE DE ERROR POR MAL LOGIN
  // const [loginIncorrecto, setLoginIncorrecto] = useState(0);

  // // PROXIMAMENTE 
  // function buscarCamposVacios() {
  //   for (let propiedad in login) {
  //     console.log(login[propiedad]);
  //     if(login[propiedad] === '')
  //       setLoginIncorrecto(2);
  //   }
  // }

  function manejoClickLogin(event) {
    event.preventDefault();
   
    axios.post('http://localhost:3030/login', { 
      nombreUsuario: login.usuario,
      passUsuario: login.password
    })
    .then(console.log('usuario enviado a backend'))
    .catch( err => { console.log(err) });
  }

  return (
    <>
      <h1>Inicio de sesión</h1>
      <form action="post">
        <InputFormulario 
          tipo="text" 
          nombre="usuario" 
          textoLabel="Usuario" 
          alCambiarInput={alCambiarLogin} 
        />
        <InputFormulario 
          tipo="password" 
          nombre="password" 
          textoLabel="Contraseña" 
          alCambiarInput={alCambiarLogin}
        />
        {/* {loginIncorrecto === 1  
          ? <p className="incorrecto">El usuario y contraseña no coinciden</p>
        : loginIncorrecto === 2 
          ? <p className="incorrecto">No pueden haber campos vacios</p> : null
        } */}
        <button onClick={manejoClickLogin}>Ingresar</button>
      </form>
      <p className="registroEInicio">No tienes una cuenta? 
        <a href="./register" onClick={ (evento) => props.alCambiarRuta(evento, 'registro')}> Registrate!</a>
      </p>            
    </>
  )
}

export default Login;