import React, { useEffect } from 'react'; 
import AreaNuevaNota from './AreaNuevaNota';
import AreaNotas from './AreaNotas';

// const axios = require('axios').default;

const CuerpoNotas = (props) => {

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
        usuarioActivo={props.usuarioActivo}
      />
    </div>
   );
}
 
export default CuerpoNotas;