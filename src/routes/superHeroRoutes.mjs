//Define las rutas para cada operación del controlador.

import express from 'express';

import {
    obtenerSuperheroePorIdController,
    obtenerTodosLosSuperheroesController,
   // buscarSuperheroesPorAtributoController,
    //obtenerSuperheroesMayoresDe30Controller, 
    agregarSuperHeroesController,// modificarSuperHeroesporIdController,
    
    
    modificarSuperHeroesController,
    modificar1SuperHeroesController,
    eliminarSuperHeroesController,
    
} from '../controllers/superheroesController.mjs';

//Express-Validator
import { sHeroesValidationRules } from '../validaciones/superHeroesValidationRules.js';
import { validationHandler } from '../validaciones/errorMiddleware.js'


const router = express.Router();

router.get('/heroes', obtenerTodosLosSuperheroesController);
/*router.get('/heroes/agregar', (req, res) => {
    res.render('agregarSuperHeroe', {title: }); // sin .ejs
});*/
router.get('/heroes/modificar/:id', obtenerSuperheroePorIdController);
//router.put('/heroes/modificar/:id', sHeroesValidationRules(), validationHandler, modificar1SuperHeroesController );
router.post('/heroes/nuevo/agregarheroes', sHeroesValidationRules(), validationHandler, agregarSuperHeroesController);
router.put('/heroes/modificar-id/:id',sHeroesValidationRules(), validationHandler, modificarSuperHeroesController);
/*router.put('/heroes/modificar-id/:id', (req, res) => {
    res.render('modificarSuperHeroe', {title: "Modificar Super Heroe" }); // sin .ejs
});*/
router.delete('/heroes/eliminar/id/:id', eliminarSuperHeroesController);


export default router;

