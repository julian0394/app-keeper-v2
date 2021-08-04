import React, { useState } from 'react';
import sinFoto from '../usuario-sin-foto.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

const Perfil = (props) => {

  // STATE DONDE SE ALMACENARÁ LA IMAGEN PARA ALMACENARLA EN LA WEB
  const [imagen, setImagen] = useState(null);

  // STATE PARA MOSTRAR LA IMAGEN SELECCIONADA
  const [preview, setPreview] = useState('');

  // TRIGGER PARA MENSAJES DE ERROR
  const [malInput, setMalInput] = useState(false);
  
  const manejoBotonVolver = () => {
    props.cambioRuta('notas');
  }

  const manejoCambioImagen = async (event) => {
    const foto = await event.target.files[0]; // En este caso con un solo input, se toma el primer elemento del array
    
    if (foto.type.substr(0, 5) === 'image') { // (foto.type === 'image/jpeg' || foto.type === 'image/png') 
      console.log('type ok');
      setImagen(foto);
      setMalInput(false);

    }
    else {
      setMalInput(true);
    }
  }

  const manejoBotonEnviarImagen = (event) => {
    event.preventDefault(); 
    if (imagen === null) 
      setMalInput(true);
    else
      console.log('enviado');
  }

  return (  
    <div className="perfil">
      <h1>PROFILEEE</h1>
      <h2>{props.usuarioActivo.nombreUsuario}</h2>
      <h3>Activo desde: {props.usuarioActivo.fechaRegistro}</h3>
      <img className="foto-usuario" src={imagen === null ? sinFoto : imagen} alt="Foto de perfil" />
      <form action="POST" onSubmit={manejoBotonEnviarImagen}>
        <input 
          type="file" 
          onChange={manejoCambioImagen}
          accept="image/*" 
          name="input-foto" 
          id="input-foto" 
        />
        <div className="tooltip" >
          <label className="label-foto" htmlFor="input-foto">
            <FontAwesomeIcon className="btn-nota btn-borrar" icon={faUpload} />
          </label>
          <p className="texto-tooltip">Buscar</p>
        </div>
        
        {malInput && <p className="incorrecto">Solo se aceptan imágenes PNG o JPG</p>}

        
        
        {/* <button className="btn-subit-foto">ENVIAR</button> */}
      </form>
      <button className="boton-con-texto" onClick={manejoBotonVolver}>Volver a la app</button>
    </div>
  );
}
 
export default Perfil;