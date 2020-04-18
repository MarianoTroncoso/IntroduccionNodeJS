const express = require('express');
const router = express.Router();

// modelo Viajes
const Viaje = require('../models/Viajes');
// modelo Testimoniales 
const Testimonial = require('../models/Testimoniales');


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

    router.get('/testimoniales', (req, res) => {
        res.render('testimoniales', {
            pagina: 'Testimoniales'
        });
     });
    
    // cuando llenamos el formulario
    router.post('/testimoniales', (req, res) => {
        // console.log(req.body)
        // validar que los campos esten llenos
        let {nombre, correo, mensaje} = req.body;
        let errores = [];
        if(!nombre){
            errores.push({'mensaje': 'Agrega tu Nombre'})
        }
        if(!correo){
            errores.push({'mensaje': 'Agrega tu Correo'})
        }
        if(!mensaje){
            errores.push({'mensaje': 'Agrega tu Mensaje'})
        }
        
        // revisar por errores
        if(errores.length > 0){
            // muestra la vista con errores
            res.render('testimoniales', {
                errores,
                nombre,
                correo,
                mensaje
            })

        } else {
            // almacenar en la BD
            Testimonial.create({
                nombre,
                correo,
                mensaje
            }).then(testimonial => res.redirect('/testimoniales'))
              .catch(error => console.log(error))
        }
    })

    return router;
}