 
// importar express
const express = require('express');
// importar archivo con las rutas
const routes = require('./routes');
 
// configurar express
const app = express();

// cargar rutas
app.use('/', routes() )


app.listen(3000);
