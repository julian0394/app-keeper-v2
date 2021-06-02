const express = require('express');
const mysql = require('mysql');
const cors = require('cors');


// Usos de paquetes y middleware
const app = express();
app.use(express.json());

app.use(cors());

const db = mysql.createConnection({
  host: "sql10.freesqldatabase.com",
  user: "sql10415609",
  // password: "42uMSjxtYE",
  password: `${process.env.REACT_APP_PASS_DB}`, 
  database: "sql10415609",
});

db.connect( err => {
  if (err) {
    console.error('Error al conectarse a BD: ' + err.stack);
    return;
  }
  console.log('Conectado a BD correctamente');
});


// Funciones server / rutas
app.listen( process.env.PORT || 3030, () => {
  console.log("Servidor -J- iniciado");
  // db.query('select * from Usuarios', (err, resultado, campos) => {
  //   if(err) console.log(err);
  //   else console.log(resultado);
  // });
  // console.log('holi');
}); 
/*  process.env.PORT es para el servidor de heroku una vez que este subido a esa web */

app.get('/', (req, res) => {
  res.send('DB de Juli!')
});

app.post('/login', (req, res) => {
  const {nombreUsuario, passUsuario} = req.body;
  const buscarUsuarioEnDB = `
    SELECT nombreUsuario, passUsuario FROM Usuarios WHERE nombreUsuario = '${nombreUsuario}';
  `; 
  db.query(buscarUsuarioEnDB, (err, resultado) => {
    // console.log(resultado);
    if(resultado[0].passUsuario === passUsuario) 
      console.log('ACCESO PERMITIDO');
    else
      console.log('NONONO');  /* HAY QUE PASARLO AL FRONT-END */
  });
});

app.post('/register', (req, res) => {
    const {nombreUsuario, mailUsuario, passUsuario} = req.body;
    const insertarEnDB = `
      INSERT INTO Usuarios VALUES (default, '${nombreUsuario}', '${mailUsuario}', '${passUsuario}', '${calcularFecha()}', 0, null);
    `;

    db.query(insertarEnDB, (err, resultado) => {
      if (err.errno === 1062) {
        console.log('ESE USUARIO YA EXISTE'); /* TENGO QUE PASARLO AL FRONT-END */
      } else if(err)
        throw err;
      else console.log("insertado");
    });
});


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
