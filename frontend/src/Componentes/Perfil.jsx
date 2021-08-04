import React, { useState, useEffect } from 'react';
import sinFoto from '../usuario-sin-foto.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faTimes } from '@fortawesome/free-solid-svg-icons';

const Perfil = (props) => {

  // STATE DONDE SE ALMACENARÁ LA IMAGEN PARA ALMACENARLA EN LA WEB
  const [imagen, setImagen] = useState(null);

  // STATE PARA MOSTRAR LA IMAGEN SELECCIONADA
  const [preview, setPreview] = useState('');

  // TRIGGER PARA MENSAJES DE ERROR
  const [malInput, setMalInput] = useState(false);
  
  const manejoBotonVolver = () => {
    //////////////////// FALTA HACER FETCH A CLOUDIFY COMO PARA CONFIRMAR LA SELECCION DE FOTO ///////////////
    props.cambioRuta('notas');
  }

  const manejoCambioImagen = async (event) => {
    const foto = await event.target.files[0] || event.dataTransfer.files[0]; // En este caso con un solo input, se toma el primer elemento del array

    if (foto.type.substr(0, 5) === 'image') { // (foto.type === 'image/jpeg' || foto.type === 'image/png') 
      console.log('type ok');
      setMalInput(false);
      setImagen(foto);
    }
    else {
      setMalInput(true);
    }
  }

  const borrarFoto = () => {
    setImagen(null);
    console.log('imagen borrada');
  }

  const manejoBotonEnviarImagen = (event) => {
    event.preventDefault(); 
    if (imagen === null) 
      setMalInput(true);
    else
      console.log('enviado');
  }

  useEffect( () => {
    if (imagen) {
      const reader = new FileReader();
      reader.onloadend = () => {  
        setPreview(reader.result);
      }
      reader.readAsDataURL(imagen);
    } else {
      console.log("effect cambia preview a '' ");
      setPreview('');
    }
  }, [imagen]);
 

  return (  
    <div className="perfil">
      <h2>{props.usuarioActivo.nombreUsuario}</h2>
      <h3>Activo desde: {props.usuarioActivo.fechaRegistro}</h3>
      <img className="foto-usuario" src={imagen === null ? sinFoto : preview} alt="Foto de perfil" />
      <form action="POST" onSubmit={manejoBotonEnviarImagen}>
        <input 
          type="file" 
          onChange={manejoCambioImagen}
          accept="image/*" 
          name="input-foto" 
          id="input-foto" 
        />
      </form>
      <div className="botones-foto">
        <div className="tooltip" >
          <label className="label-foto" htmlFor="input-foto">
            <FontAwesomeIcon icon={faUpload} />
          </label>
          <p className="texto-tooltip">Buscar</p>
        </div>

        {/* Cruz para borrar imagen cargada. Solo visible cuando haya foto cargada */}
        <div className="tooltip">
          {preview && <FontAwesomeIcon className="borrar-imagen" icon={faTimes} onClick={borrarFoto} />}
          <p className="texto-tooltip">Eliminar</p>
        </div>
      </div>  

      {/* Mje poco comun por si se sube algo que no sea una imagen */}
      {malInput && <p className="incorrecto">Solo se aceptan imágenes PNG o JPG</p>}
      
      <button className="boton-con-texto" onClick={manejoBotonVolver}>Guardar y volver</button>
    </div>
  );
}
 
export default Perfil;