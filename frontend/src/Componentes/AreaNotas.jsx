import React, { useState, useEffect } from 'react';
import Nota from './Nota';

const axios = require('axios').default;

const AreaNotas = (props) => {

  // const borrarNota = indiceABorrar => {
  //   setListaNotas((valorPrevio) => {
  //     return valorPrevio.filter(
  //       (elemento, index) => {
  //         return index !==  indiceABorrar; 
  //       }
  //     );
  //   });
  // }
  
  
  
  const buscarNotasEnDB = async () => {
    const idUsuario = props.usuarioActivo.ID_usuario;
    try {  
      console.log('Buscando notas... con el id ' + idUsuario);
      const resultado = await axios.post('http://localhost:3030/notas/mostrar', { 
        ID_usuario: idUsuario
      });
      await setearNotas(resultado.data)
      console.log('lista state', props.listaNotas);
    } 
    catch (error) {
      console.log('error J en front', error);
    }
  }

  const setearNotas = async (arrayNotasBD) => {
    props.setListaNotas(arrayNotasBD);
  };

  // const renderizarNotas = (notasState) => {
  //   notasDB.map( (notita) => {
      
  //   });
  // }

  

  useEffect( () => {
    console.log('use effect busca el id ' + props.usuarioActivo.ID_usuario);  
    buscarNotasEnDB();
    // renderizarNotas();
  }, [] );

  
  return ( 
    <>
      {props.listaNotas.length === 0 
      ? <div className="div-sin-notas">No hay notas que mostrar</div> 
      : <div className="lista-notas">
          <ul>
            {props.listaNotas.map( (notita, indice) => {
              return <Nota 
                key={notita.ID_nota} 
                id={notita.ID_nota} 
                titulo={notita.tituloNota} 
                contenido={notita.cuerpoNota}
                btnBorrar={props.borrarNota}
              />
            })}
          </ul>
        </div> 
      }
      {/* <button onClick={buscarNotasEnDB}>traer notas</button> */}
    </>
   );
}
 
export default AreaNotas;