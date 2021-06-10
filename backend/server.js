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


app.post('/register', (req, res) => {
    const {nombreUsuario, mailUsuario, passUsuario} = req.body;
    const query = insertarEnBD(nombreUsuario, mailUsuario, passUsuario);

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


app.get('/notas/mostrar', (req, res) => {

});

app.put('/notas/editar', (req, res) => {

});

app.delete('/notas/borrar', (req, res) => {

});


/* Averiguar si es nesesario (por buneas practicas) hacer un post request con el usuario
    y luego un get request para que se traiga la información en un useEffect o algo */



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

const insertarEnBD = (nombreUsuario, mailUsuario, passUsuario) => {
  return`
    INSERT INTO Usuarios 
    VALUES (null, '${nombreUsuario}', '${mailUsuario}', '${passUsuario}', '${calcularFecha()}', 0, null);
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
