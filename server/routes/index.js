const express = require('express');
const router = express.Router();

// modelo Viajes
const Viaje = require('../models/Viajes');


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
    
     router.get('/viajes', (req, res) => {
        Viaje.findAll()
            .then(viajes => res.render('viajes', {
                pagina: 'Proximos Viajes',
                viajes
            }))
            .catch(error => console.log(error))
     });

     router.get('/viajes/:id', (req, res) => {
        // leer url
        Viaje.findByPk(req.params.id)
            .then(viaje => res.render('viaje',{
                viaje
            }))
            .catch(error => console.log(error))
     });

    return router;
}