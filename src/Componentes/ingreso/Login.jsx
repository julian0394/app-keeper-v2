import React, {useState} from 'react';
import InputFormulario from './InputFormulario';
import './icono-error.png';

function Login(props) {
    // RECIBE EL STATE DEL INPUT INDIVIDUAL, LO ALMACENA Y LO MANDA AL SERVER
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
    const [loginIncorrecto, setLoginIncorrecto] = useState(0);

    // PROXIMAMENTE 
    function buscarCamposVacios() {
        for (let propiedad in login) {
            console.log(login[propiedad]);
            if(login[propiedad] === '')
                setLoginIncorrecto(2);
        }
    }

    function manejoClickLogin(event) {
        event.preventDefault();

        if(loginIncorrecto !== 2) {
            fetch('http://localhost:3000/login', { //como fetch hace por defecto un GET, hay que pasarle el otro metodo como 2do param.
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    usuario: login.usuario,
                    password: login.password
                })
            })
            .then( response => response.json() )
            .then( usuarioDB => {
                if(usuarioDB.id) {
                    console.log('usuarioDB', usuarioDB);
                    props.instanciarUsuario(usuarioDB);
                    // this.props.loadUser(user);
                    props.cambioRuta('notas');
                }
                // else if(data === 'Error al logearse') {
                //     setLoginIncorrecto(1);
                // }
            });
            // .then( response => response.json() )
            // .then( data => {
            //     if(data === 'Exito') 
            //         props.cambioRuta('notas');
            //     else if(data === 'Error al logearse') {
            //         setLoginIncorrecto(1);
            //     }
            // })
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
                    alCambiarInput={alCambiarLogin} 
                />
                <InputFormulario 
                    tipo="password" 
                    nombre="password" 
                    textoLabel="Contraseña" 
                    alCambiarInput={alCambiarLogin}
                />
                {loginIncorrecto === 1  
                    ? <p className="incorrecto">El usuario y contraseña no coinciden</p>
                : loginIncorrecto === 2 
                    ? <p className="incorrecto">No pueden haber campos vacios</p> : null
                }
                <button onClick={manejoClickLogin}>Ingresar</button>
            </form>
            <p className="registroEInicio">No tienes una cuenta?  
                <a onClick={(evento) => props.alCambiarRuta(evento, 'registro')} 
                href="./register">Registrate!</a>
            </p>            
        </>
    )
}

export default Login;