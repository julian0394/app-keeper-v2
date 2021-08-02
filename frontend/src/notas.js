const notas = [
    {
      key: 1,
      titulo: "Delegation",
      contenido:
        "Q. How many programmers does it take to change a light bulb? A. None – It’s a hardware problem"
    },
    {
      key: 2,
      titulo: "Loops",
      contenido:
        "How to keep a programmer in the shower forever. Show him the shampoo bottle instructions: Lather. Rinse. Repeat."
    },
    {
      key: 3,
      titulo: "Arrays",
      contenido:
        "Q. Why did the programmer quit his job? A. Because he didn't get arrays."
    },
    {
      key: 4,
      titulo: "Hardware vs. Software",
      contenido:
        "What's the difference between hardware and software? You can hit your hardware with a hammer, but you can only curse at your software."
    }
  ];

  // <header>
  //       <h1 className="no-seleccionable"> <FontAwesomeIcon className="logo" icon={faLightbulb} /> Keeper </h1>
  //       {props.ruta === 'notas' && 
  //           <div className="usuario-header">
  //             <img className="foto-usuario" onClick={() => console.log('profile')} src={sinFoto} alt="Foto gris generica" />
  //             {/* <FontAwesomeIcon className="flecha-menu" icon={faCaretDown} onClick={manejoCierreSesion} /> */}
  //           </div>   
  //       }
  //       {menuAbierto &&
  //         <div className="menu">
  //           {/* <p className="item">Información</p>
  //           <p className="item">Ver perfil</p>
  //           <p className="item">Cerrar sesión</p> */}
  //           <FontAwesomeIcon className="item" icon={faInfoCircle} onClick={() => console.log('info')} />
  //           <FontAwesomeIcon className="item" icon={faSignOutAlt} onClick={manejoCierreSesion} />
  //         </div>
  //       }
  //     </header>

  export default notas;