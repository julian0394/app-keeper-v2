import React, { useState } from 'react';
import InputFormulario from './InputFormulario';

const axios = require('axios').default;

function Registro(props) {
  const registroDefault = {
    usuario: '',
    email: '',
    password: '',
  };

  // RECIBE EL STATE DEL INPUT INDIVIDUAL, LO ALMACENA Y LO MANDA AL SERVER
  const [registro, setRegistro] = useState(registroDefault);

  function cambioRegistro(name, value) {
    setRegistro( registroPrevio => {
      return {
        ...registroPrevio,
        [name]: value,  /* Name va entre [] para que sepa que debe tomar el argumento de la funcion */
      }
    });
  }
    
  async function manejoClickRegistro(event) {
    try {
      event.preventDefault();
      
      if( props.buscarPropiedadVacia(registro) ) {
        console.log('usuario enviado al backend');
        const resultado = await axios.post('http://localhost:3030/register', {
          nombreUsuario: registro.usuario.trim(),
          mailUsuario: registro.email.trim(),
          passUsuario: registro.password,
        });

        if(resultado.data === 'existente')
          await props.setInputIncorrecto(1); /* Hubo coincidencias con otro usuario */
        else {
          await props.setUsuarioActivo(resultado.data);
          await setRegistro(registroDefault); /* Vuelve los campos a cero */
          await props.setInputIncorrecto(0);
          console.log(resultado.data);
          await props.cambioRuta('notas');
        }
      } else 
        await props.setInputIncorrecto(2); /* Hubo campos vacios */
    }
    catch(error) {
      console.log('error J en front', error);
    }
  }

  return (
    <>
      <h1>Registro de cuenta</h1>
      <form action="post">
        <InputFormulario 
          tipo="text" 
          nombre="usuario" 
          textoLabel="Usuario" 
          alCambiarInput={cambioRegistro}
        />
        <InputFormulario 
          tipo="email" 
          nombre="email" 
          textoLabel="Mail ficticio" 
          alCambiarInput={cambioRegistro}
        />
        <InputFormulario 
          tipo="password" 
          nombre="password" 
          textoLabel="Contraseña" 
          alCambiarInput={cambioRegistro}
        />
        
        {props.inputIncorrecto === 1 && <p className="incorrecto">El usuario o correo ya fue utilizado</p>}
        {props.inputIncorrecto === 2 && <p className="incorrecto">No se aceptan campos vacios</p>}
        
        <button onClick={manejoClickRegistro}>Registrarse</button>
      </form>
      <p className="registroEInicio">Ya tienes una cuenta?
        <a onClick={(evento) => props.alCambiarRuta(evento, 'login')} href="./login">Inicia sesión!</a>
      </p>        
    </>
  )
}

export default Registro;