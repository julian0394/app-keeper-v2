import React, {useState} from 'react';
import InputFormulario from './InputFormulario';

function Registro(props) {
    // RECIBE EL STATE DEL INPUT INDIVIDUAL, LO ALMACENA Y LO MANDA AL SERVER
    const [registro, setRegistro] = useState({
        usuario: '',
        email: '',
        password: '',
    });

    function alCambiarRegistro(name, value) {
        setRegistro( registroPrevio => {
            return {
                ...registroPrevio,
                [name]: value,  // Name va entre [] para que sepa que debe tomar el argumento de la funcion
            }
        });
    }

    // STATE PARA MOSTRAR EL MENSAJE DE ERROR POR MAL REGISTRO
    const [registroIncorrecto, setRegistroIncorrecto] = useState(0);
    
    function manejoClickRegistro(event) {
        event.preventDefault();

        if(registroIncorrecto !== 2) {
            fetch('http://localhost:3000/register', { //como fetch hace por defecto un GET, hay que pasarle el otro metodo como 2do param.
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    usuario: registro.usuario,
                    email: registro.email,
                    password: registro.password
                })
            })
            .then( response => response.json() )
            .then( usuario => {
                if(usuario) {
                    props.instanciarUsuario(usuario)
                    props.cambioRuta('notas');

                }
                else 
                    setRegistroIncorrecto(1);
            })
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
                    alCambiarInput={alCambiarRegistro}
                />
                <InputFormulario 
                    tipo="email" 
                    nombre="email" 
                    textoLabel="Mail ficticio" 
                    alCambiarInput={alCambiarRegistro}
                />
                <InputFormulario 
                    tipo="password" 
                    nombre="password" 
                    textoLabel="Contraseña" 
                    alCambiarInput={alCambiarRegistro}
                />
                {registroIncorrecto === 1  
                    ? <p className="incorrecto">El usuario o correo ya está existe</p>
                : registroIncorrecto === 2 
                    ? <p className="incorrecto">No pueden haber campos vacios</p> : null
                }
                <button onClick={manejoClickRegistro}>Registrarse</button>
            </form>
            <p className="registroEInicio">Ya tienes una cuenta?
                <a onClick={(evento) => props.alCambiarRuta(evento, 'login')} href="./login">Inicia sesión!</a>
            </p>        
        </>
    )
}

export default Registro;