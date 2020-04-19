 
// importar express
const express = require('express');
// acceder al file system 
const path = require('path');
// para leer datos del formulario de testimoniales ??????
const bodyParser = require('body-parser');

// importar archivo con las rutas
const routes = require('./routes');
const configs = require('./config');
const db = require('./config/database');

require('dotenv').config({path: 'variables.env'})

// pruebo la conexion
// db.authenticate()
//    .then(()=> console.log('bd conectada!'))
//    .catch(error => console.log(error))

// configurar express
const app = express();

// habilitar pug
app.set('view engine', 'pug')

// añadir las vistas
app.set('views', path.join(__dirname, './views'));

// cargar una carpeta estatica llamada public
app.use(express.static('public'));

// validar si estamos en desarrollo o production
const config = configs[app.get('env')];
// creamos la variable para el sitio web
app.locals.titulo = config.nombresitio

// muestra el año actual y genera la ruta
app.use((req, res, next) => {
   // crear una nueva fecha 
   const fecha = new Date();
   res.locals.fechaActual = fecha.getFullYear();

   res.locals.ruta = req.path;

   // para que continue ejecutando la proxima funcion
   return next();
});


// ejecutamos el body parser
app.use(bodyParser.urlencoded({extended: true}))

// cargar rutas
app.use('/', routes() )

// puerto y host para la app 
// como no sabemos que valores de puerto vamos a usar, lo dejamos libre para que 
// eroku lo asigne
const host = process.env.HOST || '0.0.0.0';
// 0.0.0.0 es la direccion asignada por eroku por si falla algo
const port = process.env.PORT || 3000;
// app.listen(3000);
app.listen(port, host, () => {
   console.log('el servidor esta funcionando')
} )
