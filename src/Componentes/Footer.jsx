import React from 'react';
import '../estilosComponentes/footer.css';

// Año automatico para copyright.
const anio = new Date().getFullYear(); //"Anio" para no usar Ñ.

function Footer() {
    return <footer className="no-seleccionable"><p>Copyright ⓒ - Juli Pérez - {anio}</p></footer>
}

export default Footer;
