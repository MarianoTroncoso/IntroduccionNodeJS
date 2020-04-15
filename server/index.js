 
// importar express
const express = require('express');
// acceder al file system 
const path = require('path');
// importar archivo con las rutas
const routes = require('./routes');
 
// configurar express
const app = express();

// habilitar pug
app.set('view engine', 'pug')

// añadir las vistas
app.set('views', path.join(__dirname, './views'));

// cargar una carpeta estatica llamada public
app.use(express.static('public'));

// cargar rutas
app.use('/', routes() )


app.listen(3000);
