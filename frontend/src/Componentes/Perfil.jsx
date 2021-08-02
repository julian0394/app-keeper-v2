import React, { useState } from 'react';

const Perfil = (props) => {

  const [imagen, setImagen] = useState(null);
  const [malInput, setMalInput] = useState(false);
  
  const manejoBotonVolver = () => {
    props.cambioRuta('notas');
  }

  const manejoCambioImagen = async (event) => {
    const foto = await event.target.files[0]; // En este caso con un solo input, se toma el primer elemento del array
    
    if (foto.type === "image/jpeg") {
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
      <form action="POST" onSubmit={manejoBotonEnviarImagen}>
        <input 
          type="file" 
          onChange={manejoCambioImagen}
          accept="image/png, image/jpeg" 
          name="foto-perfil" 
          id="input-foto" 
        />
        {malInput === true && <p className="incorrecto">Solo se aceptan imágenes PNG o JPG</p>}
        <button className="btn-subit-foto">ENVIAR</button>
      </form>
      <button className="boton-con-texto" onClick={manejoBotonVolver}>Volver a la app</button>
    </div>
  );
}
 
export default Perfil;