const express = require('express');
const router = express.Router();

// forma de exportar
module.exports = function(){
    router.get('/', (req, res) => {
        res.render('index');
     });
     
    router.get('/nosotros', (req, res) => {
        res.render('nosotros', {
            pagina: 'Sobre Nosotros'
        });
     });

    return router;
}