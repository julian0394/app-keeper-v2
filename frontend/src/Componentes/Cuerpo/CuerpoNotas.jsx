import React, { useState } from 'react'; 
import AreaNuevaNota from './AreaNuevaNota';
import AreaNotas from './AreaNotas';

const axios = require('axios').default;

const CuerpoNotas = (props) => {

  // STATE DEL 'MODO EDICION'
  const [modoEdicion, setModoEdicion] = useState(false);

  // STATE DEL "NOTA A MODIFICAR"
  const [notaParaEditar, setNotaParaEditar] = useState({});

  const buscarNotasEnDB = async () => {
    const idUsuario = props.usuarioActivo.ID_usuario;
    try {  
      const resultado = await axios.post('http://localhost:3030/notas/mostrar', { 
        ID_usuario: idUsuario
      });
      await props.setListaNotas(resultado.data)
    } 
    catch (error) {
      console.log('error J al buscar notas', error);
    } 
  }

  const editarNota = () => {
    // OK - copiar contenido de nota
    setModoEdicion(!modoEdicion);
    
    //OK - pasarlo a nuevaNota

    // oscurecer el fondo

    // guardar id para enviar modificacion a BD
    
    console.log('modo edicion:', modoEdicion);
  }

  return ( 
    <div className="contenedor-notas">
      <div className={modoEdicion ? "edicion-habilitada" : "" }>
        <AreaNuevaNota 
          setListaNotas={props.setListaNotas}
          usuarioActivo={props.usuarioActivo} 
          listaNotas={props.listaNotas} 
          buscarNotasEnDB={buscarNotasEnDB}

          modoEdicion={modoEdicion}
          notaParaEditar={notaParaEditar}
          // setNotaParaEditar={setNotaParaEditar}
          editarNota={editarNota}
        />       
        <AreaNotas 
          listaNotas={props.listaNotas} 
          setListaNotas={props.setListaNotas} 
          usuarioActivo={props.usuarioActivo}
          buscarNotasEnDB={buscarNotasEnDB}

          setNotaParaEditar={setNotaParaEditar}
          // notaParaEditar={notaParaEditar}
          editarNota={editarNota}
          modoEdicion={modoEdicion}
        />      
      </div>
    </div>
   );
}
 
export default CuerpoNotas;