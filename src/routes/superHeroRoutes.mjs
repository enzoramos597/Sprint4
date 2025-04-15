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
router.get('/heroes/:id', obtenerSuperheroePorIdController);
//router.put('/heroes/modificar/:id', sHeroesValidationRules(), validationHandler, modificar1SuperHeroesController );
router.post('/heroes/nuevo/agregarheroes', sHeroesValidationRules(), validationHandler, agregarSuperHeroesController);
router.put('/heroes/modificar-id/:id', modificarSuperHeroesController);
router.delete('/heroes/eliminar/id/:id', eliminarSuperHeroesController);

/*router.get('/heroes', obtenerTodosLosSuperheroesController);
router.get('/heroes/buscar-id/:id', obtenerSuperheroePorIdController);
router.get('/heroes/buscar/:atributo/:valor', buscarSuperheroesPorAtributoController);
router.get('/heroes/mayores-30', obtenerSuperheroesMayoresDe30Controller);

//Sprint 3 - TP1
router.get('/heroes', obtenerTodosLosSuperheroesController);
router.post('/heroes/nuevo/agregarheroes', agregarSuperHeroesController);
router.put('/heroes/actualizar/:id/:atributo/:valor', modificarSuperHeroesporIdController );
router.delete('/heroes/eliminar/id/:id', eliminarSuperheroePorIdController);
router.delete('/heroes/eliminarpornombre/:nombre', eliminarSuperheroePorNombreController);*/
export default router;

//Sprint 3 - TP2
//router.post('/heroes/nuevo/agregarheroes', sHeroesValidationRules(),  validationHandler, agregarSuperHeroesController);