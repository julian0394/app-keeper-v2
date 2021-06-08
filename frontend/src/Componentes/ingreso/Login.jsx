import React, {useEffect, useState} from 'react';
import InputFormulario from './InputFormulario';
import './icono-error.png';
const axios = require('axios').default;

function Login(props) {
  // RECIBE EL STATE DEL INPUT INDIVIDUAL, LO ALMACENA Y luego LO MANDA AL SERVER
  const [login, setLogin] = useState({
    usuario: '',
    password: '',
  });

  function cambioLogin(name, value) {
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


  async function manejoClickLogin(event) {
    try {

      event.preventDefault();
      console.log('usuario enviado al backend');
      // props.cambioRuta('notas'); //   -------------------> solo para pasar a las notas..
      const resultado = await axios.post('http://localhost:3030/login', { 
        nombreUsuario: login.usuario,
        passUsuario: login.password
      });
      
      if(resultado.data === '')
        console.log('El usuario y la contraseña no coinciden');
      else
        await props.setUsuarioActivo(resultado.data);

    } catch (error) {
        console.log('error J en front', error);
    }
  }

  useEffect( () => {
    console.log('adentro effect');
    console.log(props.usuarioActivo);
  }, [props.usuarioActivo]);

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
        {/* {loginIncorrecto === 1  
          ? <p className="incorrecto">El usuario y contraseña no coinciden</p>
        : loginIncorrecto === 2 
          ? <p className="incorrecto">No pueden haber campos vacios</p> : null
        } */}
        <button onClick={manejoClickLogin}>Ingresar</button>
      </form>
      <p className="registroEInicio">No tienes una cuenta? 
        <a href="./register" onClick={ (evento) => props.alCambiarRuta(evento, 'registro')}> Registrate!</a>
        {/* <a href="./register" onClick={ pruebaGet }> Registrate!</a> */}
      </p>            
    </>
  )
}
 
export default Login;