import React, { useEffect } from 'react'; 
import AreaNuevaNota from './AreaNuevaNota';
import AreaNotas from './AreaNotas';

const axios = require('axios').default;

const CuerpoNotas = (props) => {

  // const buscarNotasEnDB = async () => {
  //   const idUsuario = props.usuarioActivo.ID_usuario;
  //   try {  
  //     // console.log('Buscando notas... con el id ' + idUsuario);
  //     const resultado = await axios.post('http://localhost:3030/notas/mostrar', { 
  //       ID_usuario: idUsuario
  //     });
  //     await setearNotas(resultado.data)
  //   } 
  //   catch (error) {
  //     console.log('error J en front', error);
  //   }
  // }

  // const setearNotas = (arrayNotasBD) => {
  //   props.setListaNotas(arrayNotasBD);
  // };

  return ( 
    <div className="contenedor-notas">
      <AreaNuevaNota 
        setListaNotas={props.setListaNotas}
        usuarioActivo={props.usuarioActivo} 
        listaNotas={props.listaNotas} 
      />
      <AreaNotas 
        listaNotas={props.listaNotas} 
        setListaNotas={props.setListaNotas} 
        borrarNota={props.borrarNota} 
        setNota={props.setNota} 
        usuarioActivo={props.usuarioActivo}
        // buscarNotasEnDB={buscarNotasEnDB} 
      />
    </div>
   );
}
 
export default CuerpoNotas;