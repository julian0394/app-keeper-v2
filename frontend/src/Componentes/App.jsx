import React, {useState} from 'react';

import Header from './Header';
import Footer from './Footer';
// import AreaNuevaNota from './AreaNuevaNota';
// import AreaNotas from './AreaNotas';
import Ingreso from './ingreso/Ingreso';
import CuerpoNotas from './Cuerpo/CuerpoNotas';

import '../Estilos/App.scss'

const App = () => {
  //STATE DE NOTA
  // const [nota, setNota] = useState({}); 
  
  // const setearNota = nuevaNota => {
  //   setNota(nuevaNota);
  //   // agregarNuevasNotas(nuevaNota);
  // } 

  // //STATE DE LISTA DE NOTAS QUE SE MUESTRAN
  const [listaNotas, setListaNotas] = useState([]);


  const borrarNota = indiceABorrar => {
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

  const cambioRuta = nuevaRuta => {  
    setRuta(nuevaRuta)
  }

  //STATE DE USUARIO ACTIVO PARA BUSCAR SUS NOTAS
  const [usuarioActivo, setUsuarioActivo] = useState({});

  return (
    <>
      <Header 
        ruta={ruta} 
        cambioRuta={cambioRuta} 
        setUsuarioActivo={setUsuarioActivo} 
        setListaNotas={setListaNotas} 
      />           
      <div className="div-body"> 
        {(ruta === 'login' || ruta === 'registro') 
          ?
            <Ingreso 
              ruta={ruta} 
              cambioRuta={cambioRuta}
              usuarioActivo={usuarioActivo}
              setUsuarioActivo={setUsuarioActivo}
            />
          :
            <CuerpoNotas 
              usuarioActivo={usuarioActivo}
              listaNotas={listaNotas} 
              setListaNotas={setListaNotas} 
              // borrarNota={borrarNota} 
              // setNota={setNota} 
              usuarioActivo={usuarioActivo}
            />
            // <div className="contenedor-notas">
            //   <AreaNuevaNota /*setearNota={setearNota} agregarNuevasNotas={agregarNuevasNotas}*/ usuarioActivo={usuarioActivo} />
            //   <AreaNotas listaNotas={listaNotas} setListaNotas={setListaNotas} borrarNota={borrarNota} setNota={setNota} usuarioActivo={usuarioActivo} />
            // </div> 
        } 
      </div>   
      <Footer />
    </>
  );
}

export default App;