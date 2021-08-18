import React, { useState, useEffect } from 'react';
// Imagenes
import sinFoto from '../usuario-sin-foto.png';
// Iconos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';

const axios = require('axios').default;

const Perfil = (props) => {

  // STATE DONDE SE ALMACENARÁ LA IMAGEN ELEGIDA PARA CAMBIAR
  const [imagenVieja, setImagenVieja] = useState(props.usuarioActivo.fotoUsuario);

  // STATE DONDE SE ALMACENARÁ LA IMAGEN ELEGIDA PARA CAMBIAR
  const [imagenElegida, setImagenElegida] = useState(null);

  // STATE PARA MOSTRAR LA IMAGEN SELECCIONADA
  const [preview, setPreview] = useState('');

  // TRIGGER PARA MENSAJES DE ERROR DE IMAGEN
  const [malInput, setMalInput] = useState(false);
  
  const manejoBotonVolver = async (e) => {
    e.preventDefault();

    // HACER UN IF PARA QUE NO HAGA EL FETCH SI NO HUBO CAMBIOS
    // RE INSTANCIAR EL USUARIO PARA QUE ACTUALICE LA FOTO

      const fd = new FormData();
      fd.append('file', imagenElegida);
      fd.append('upload_preset', 'ar1mfxjp');

      const linkImg = await subirImagen(fd);

      await imagenABase(linkImg);

    await props.cambioRuta('notas');
  }

  const manejoCambioImagen = async (event) => {
    try {
      const foto = event.target.files[0] /*|| event.dataTransfer.files[0]*/; // En este caso con un solo input, se toma el primer elemento del array

      if (foto.type.substr(0, 5) === 'image') { // (foto.type === 'image/jpeg' || foto.type === 'image/png') 
        console.log('type ok');
        setMalInput(false);
        setImagenElegida(foto);
      }
      else {
        setMalInput(true);
      }
    } catch (err) {   // Esto ataja la tecla "esc" que cierra la ventana de exploracion de archivos
      setImagenElegida(imagenElegida);
    } 
  }

  const borrarFoto = () => {
    setImagenElegida(null);
    console.log('imagen borrada');
  }

  const cargarPreview = async () => {
    if (imagenElegida !== null) {
      const reader = new FileReader();
      reader.onloadend = () => { 
        setPreview(reader.result);
      }
      reader.readAsDataURL(imagenElegida);
    } else {
      setPreview('');
    }
  }

  const subirImagen = async (formData) => {     
    /* Subir a Cloudinary */
    console.log('subiendo a cloudinary');

    try {
      const res = await axios.post("https://api.cloudinary.com/v1_1/ronokoc/image/upload", formData);
      console.log('listo cloudinary');
      const link = res.data.secure_url;
      console.log('link:', link);
      return link;

    } catch (err) {
      console.log('Error J al subir a cloud', err);
    }
  }

  const imagenABase = async (linkImg) => {
    console.log("entrando a backend");

    /* Guarda link en BD */
    try {
      const respuestaDB = await axios.post(
        'http://localhost:3030/imagenUsuario/subir', 
        {
          link: linkImg,
          ID_usuario: props.usuarioActivo.ID_usuario
        });
      console.log(respuestaDB);
    } catch (err) {
      console.log('Error front J al cargar img en DB', err);
    }
  }

  // SELECCION DE IMAGEN PREVIA
  // const selectorImagen = () => {
  //   let linkFoto = '';
  //   if ( props.usuarioActivo.ID_usuario !== null ) {
  //     linkFoto = props.usuarioActivo.ID_usuario
  //     // return linkFoto;
  //   } else {
  //     if ( imagenElegida === null ) {
  //       linkFoto = sinFoto;
  //       // return sinFoto;
  //     } else{
  //       return preview;
  //     } 
  //   }
  // } 

  // CARGA LA VISTA PREVIA DE LA IMAGEN SELECCIONADA
  useEffect( () => { 
    cargarPreview();
    // console.log('imagen en state 2:', imagenElegida);
  }, [imagenElegida]);   
 

  return (  
    <div className="perfil">
      <h2>{props.usuarioActivo.nombreUsuario}</h2>
      <h3>Activo desde: {props.usuarioActivo.fechaRegistro}</h3>
      
      {/* <img className="foto-usuario" src={imagenElegida === null ? sinFoto : preview} alt="Foto de perfil" /> */}
      <img 
        className="foto-usuario" 
        src={imagenVieja !== null ? imagenVieja 
          : imagenElegida === null ? sinFoto : preview} 
        alt="Foto de perfil" 
      />
      {/* <img className="foto-usuario" src={selectorImagen} alt="Foto de perfil" /> */}
      
      <form /*action="POST" onSubmit={manejoBotonEnviarImagen} encType="multipart/form-data"*/ >
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