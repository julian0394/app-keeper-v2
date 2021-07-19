import React from 'react'; 
import AreaNuevaNota from './AreaNuevaNota';
import AreaNotas from './AreaNotas';

const axios = require('axios').default;

const CuerpoNotas = (props) => {

  const buscarNotasEnDB = async () => {
    const idUsuario = props.usuarioActivo.ID_usuario;
    try {  
      console.log('Buscando notas...');
      const resultado = await axios.post('http://localhost:3030/notas/mostrar', { 
        ID_usuario: idUsuario
      });
      console.log('seteando notas');
      await props.setListaNotas(resultado.data)
      console.log('todo OK');
    } 
    catch (error) {
      console.log('error J en front', error);
    }
  }

  return ( 
    <div className="contenedor-notas">
      <AreaNuevaNota 
        setListaNotas={props.setListaNotas}
        usuarioActivo={props.usuarioActivo} 
        listaNotas={props.listaNotas} 

        buscarNotasEnDB={buscarNotasEnDB}
      />
      <AreaNotas 
        listaNotas={props.listaNotas} 
        setListaNotas={props.setListaNotas} 
        usuarioActivo={props.usuarioActivo}

        buscarNotasEnDB={buscarNotasEnDB}
      />
    </div>
   );
}
 
export default CuerpoNotas;