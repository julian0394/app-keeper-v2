import React, { useState, useEffect } from 'react';
import Nota from '../Nota';

const axios = require('axios').default;

const AreaNotas = (props) => {
    
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
 

  useEffect( () => {
    console.log('use effect busca el id ' + props.usuarioActivo.ID_usuario);  
    buscarNotasEnDB();
  }, []);

  
  return ( 
    <>
      {props.listaNotas.length === 0 
      ? <div className="div-sin-notas">No hay notas que mostrar</div> 
      : <div className="lista-notas">
          <ul>
            {props.listaNotas.map( notita => {
              return <Nota 
                key={notita.ID_nota} 
                id={notita.ID_nota} 
                titulo={notita.tituloNota} 
                contenido={notita.cuerpoNota}
                setListaNotas={props.setListaNotas} 
                buscarNotasEnDB={buscarNotasEnDB}
              />
            })}
          </ul>
        </div> 
      }
    </>
   );
}
 
export default AreaNotas;