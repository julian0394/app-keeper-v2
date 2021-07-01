// AREA NUEVA NOTA
const crearNota = async (event) => {
  try {
    event.preventDefault();
    console.log('nota enviada al backend');
    
    const resultado = await axios.post('http://localhost:3030/login', { 
      tituloNota: '',
      cuerpoNota: '',
      ID_usuario: usuarioActivo.idUsuario,
    });
    
    if( props.buscarPropiedadVacia(login) ) {
      if( resultado.data.length === 0 )  /* Si es 0 (array vacio) significa que no trajo nada */
        await props.setInputIncorrecto(1); /* No hubo coincidencias */
      else {
        await props.setUsuarioActivo(resultado.data);
        await setLogin(defaultLogin); /* Vuelve los campos a cero */
        await props.setInputIncorrecto(0);
        await props.cambioRuta('notas');
      }
    }
    else 
      await props.setInputIncorrecto(2); /* Hubo campos vacios */
  } 
  catch (error) {
    console.log('error J en front', error);
  }
}


// MAPEO DE NOTAS