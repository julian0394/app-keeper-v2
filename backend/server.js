const express = require('express');
const mysql = require('mysql');
const cors = require('cors');



// Usos de paquetes y middleware
const app = express();
app.use(express.json());

app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "tp_vazquez", 
});

db.connect( err => {
  if (err) {
    console.error('Error al conectarse a BD: ' + err.stack);
    return;
  }
  console.log('Conectado a BD correctamente');
});
 


// Funciones server / rutas 
app.listen( process.env.PORT || 3030, () => { /* process.env.PORT es para el servidor de heroku una vez subido */
  console.log("Servidor -J- iniciado");
}); 


app.get('/', (req, res) => {
  res.send('DB de Juli!')
});


/* Login de usuario */
app.post('/login', (req, res) => { 
  const {nombreUsuario, passUsuario} = req.body;
  const query = buscarUsuarioEnDB(nombreUsuario, passUsuario); 
  db.query(query, (err, resultado) => {
    if(err)
      console.log('error J en server', err);
    else {
      if(resultado.length > 0) {
        console.log('ACCESO PERMITIDO');
        res.send(resultado[0]);
      } else {
        console.log('NONONO');
        res.send(resultado); /* Envia un array vacio */
      }  
    }
  }); 
});


/* Registro de nuevo usuario */
app.post('/register', (req, res) => {
    const {nombreUsuario, mailUsuario, passUsuario} = req.body;
    const query = insertarUsuarioEnBD(nombreUsuario, mailUsuario, passUsuario);

    db.query(query, (err, resultado) => {
      if(err){
        if (err.errno === 1062) {
          console.log('ESE USUARIO YA EXISTE');  
          res.send('existente');
        } else {
          console.log('ERROR AL INSERTAR', err);
          res.send('error'); 
        }  
      }
      else {
        console.log("INSERTADO");
        const idInsertada = resultado.insertId;
        db.query( buscarEnDBConID(idInsertada), (err2, resultado2) => {
          res.send(resultado2[0]);
        });
      }
    });
});

  
/* Agregar nueva nota */
app.post('/notas/nueva', (req, res) => {
  const {tituloNota, cuerpoNota, ID_usuario} = req.body;
  const query = insertarNotaEnBD(tituloNota, cuerpoNota, ID_usuario); 
  db.query(query, (err, resultado) => {
    if(err)
      if (err.errno === 1406) {
        console.log('ERROR, TITULO MUY LARGO', err);
        res.send('error'); 
      } else {
        console.log('ERROR AL AGREGAR', err.errno);
      }
    else {
      console.log('NOTA AGREGADA');
      res.send(resultado);     
    }
  }); 
});


/* Muestra las notas de un usuario logeado */
app.post('/notas/mostrar', (req, res) => {
  const {ID_usuario} = req.body;
  const query = buscarNotasEnDB(ID_usuario); 
  db.query(query, (err, resultado) => {
    if(err) {
      console.log('error J en server');
      res.send(err);
    } else 
      res.send(resultado);

  }); 
});


/* Edicion de nota existente */
app.put('/notas/editar', (req, res) => {

});


/* Borrar nota existente */
app.post('/notas/borrar', (req, res) => {
 const {ID_nota} = req.body;
 const query = borrarNotaEnBD(ID_nota);
 console.log('intentando borrar..');
 db.query(query, (err, resultado) => {
  if(err) {
    console.log('error J en server', err);
    res.send(err);
  } else {
    res.send(resultado);
    console.log('borrado');
  }
 });
});



// Queries
const buscarUsuarioEnDB = (nombreUsuario, passUsuario) => {
  return `
    SELECT ID_usuario, nombreUsuario, cantNotas, fechaRegistro, fotoUsuario 
    FROM Usuarios 
    WHERE nombreUsuario = '${nombreUsuario}' AND passUsuario = '${passUsuario}';
  `;  
}

const buscarEnDBConID = (id) => {
  return `
    SELECT ID_usuario, nombreUsuario, cantNotas, fechaRegistro, fotoUsuario 
    FROM Usuarios 
    WHERE ID_usuario = ${id};
  `;  
}

const insertarUsuarioEnBD = (nombreUsuario, mailUsuario, passUsuario) => {
  return`
    INSERT INTO Usuarios 
    VALUES (null, '${nombreUsuario}', '${mailUsuario}', '${passUsuario}', '${calcularFecha()}', 0, null);
  `;
}

const insertarNotaEnBD = (tituloNota, cuerpoNota, ID_usuario) => {
  return`
    INSERT INTO Notas 
    VALUES (null, '${tituloNota}', '${cuerpoNota}', '${ID_usuario}');
  `;
}

const buscarNotasEnDB = (ID_usuario) => {
  return`
    SELECT * FROM Notas WHERE ID_usuario = ${ID_usuario};
  `;
}

const borrarNotaEnBD = (ID_nota) => {
  return`
    DELETE FROM notas WHERE ID_nota = ${ID_nota};
  `;
}



// Funciones generales
function calcularFecha() {
  let fecha = new Date(),
    mes = String(fecha.getMonth() + 1),
    dia = String(fecha.getDate()),
    anio = fecha.getFullYear();

  if (mes.length < 2) 
    mes = '0' + mes;
  if (dia.length < 2) 
    dia = '0' + dia;

  const fechaHoy = [anio, mes, dia].join('-');
  return fechaHoy;
}  
