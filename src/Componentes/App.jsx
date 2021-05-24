import React, {useState} from 'react';

import Header from './Header';
import Footer from './Footer';
import Nota from './Nota';
import AreaNuevaNota from './AreaNuevaNota';
import Ingreso from './ingreso/Ingreso';

function App() {
    //STATE DE NOTA
    const [nota, setNota] = useState({}); 
    
    function setearNota(nuevaNota) {
        setNota(nuevaNota);
        agregarNuevasNotas(nuevaNota);
    } 

    //STATE DE LISTA DE NOTAS
    const [listaNotas, setListaNotas] = useState([]);

    function agregarNuevasNotas(nuevaNota) {
        setListaNotas( (valorPrevio) => {
            return [...valorPrevio, nuevaNota]
        });
    }

    function borrarNota(indiceABorrar) {
        setListaNotas((valorPrevio) => {
            return valorPrevio.filter(
                (elemento, index) => {
                    return index !==  indiceABorrar; 
                }
            );
        });
    }

    //STATE DE RUTA PARA INICIO DE SESIÓN, REGISTRO Y USO
    const [ruta, setRuta] = useState('login'); // Se manejaran 3 estados: login, signup y notas.

    function cambioRuta(nuevaRuta) {  
        setRuta(nuevaRuta)
    }

    //STATE DE USUARIO ACTIVO PARA BUSCAR SUS NOTAS
    const [usuarioActivo, setUsuarioActivo] = useState({
        nombreUsuario: '',
        mailUsuario: '',
        cantNotas: '',
        fechaRegistro: ''
    });

    function instanciarUsuario(usuarioIngresado) {
        // const {nombreUsuario, mailUsuario, cantNotas, fechaRegistro} = usuarioIngresado;
        setUsuarioActivo({
            nombreUsuario: usuarioIngresado.nombreUsuario,
            mailUsuario: usuarioIngresado.mailUsuario,
            cantNotas: usuarioIngresado.cantNotas,
            fechaRegistro: usuarioIngresado.fechaRegistro
        });
        console.log('usuario instanciado', usuarioActivo);
    }

    //METODO QUE SE ACTIVA AL RENDERIZARSE EL COMPONENTE APP
    // useEffect( ()=> {
    //     fetch('http://localhost:3000')
    //     .then( response => response.json() )
    //     .then( data => console.log(data) )
    // })

    return (
        <>
            <Header ruta={ruta} cambioRuta={cambioRuta} />           
            <div className="div-logeado"> 
                {/* {(ruta === 'login' || ruta === 'registro') && <Login2 ruta={ruta} cambioRuta={cambioRuta} />} */}
                {(ruta === 'login' || ruta === 'registro') && 
                    <Ingreso 
                        ruta={ruta} 
                        cambioRuta={cambioRuta}
                        instanciarUsuario={instanciarUsuario} 
                    />
                }
                {ruta === 'notas' && <AreaNuevaNota setearNota={setearNota} agregarNuevasNotas={agregarNuevasNotas} />}
                {ruta === 'notas' && listaNotas.length === 0 
                    ? <div className="div-sin-notas">No hay notas que mostrar</div> 
                    : ruta === 'notas' &&
                        <div className="lista-notas">
                            <ul>
                                {listaNotas.map( (notita, indice) => {
                                    return <Nota 
                                        key={indice} 
                                        id={indice} 
                                        titulo={notita.titulo} 
                                        contenido={notita.contenido}
                                        btnBorrar={borrarNota}
                                    />
                                })}               
                            </ul>
                        </div>
                }
            </div>   
            <Footer />
        </>
    );
}

export default App;