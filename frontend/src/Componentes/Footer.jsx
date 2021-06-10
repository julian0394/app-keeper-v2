import React from 'react';

// Año automatico para copyright.
const anio = new Date().getFullYear(); //"Anio" para no usar Ñ.

const Footer = () => {
  return <footer className="no-seleccionable"><p>Copyright ⓒ - Juli Pérez - {anio}</p></footer>
}

export default Footer;