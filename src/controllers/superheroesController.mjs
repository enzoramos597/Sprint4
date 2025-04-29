//Implementa el controlador para gestionar solicitudes HTTP, llamando a services
//Y utilizando las vistas para presentar los datos

import {
    obtenerSuperheroePorId,
    obtenerTodosLosSuperheroes,
    buscarSuperheroesPorAtributo,
    obtenerSuperheroesMayoresDe30,
    agregarNuevoSuperHeroe, modificarSuperHeroeporEdad,
    eliminarSuperHereoPorId,
    eliminarSuperHeroeNombre,
    modificarSuperHeroeService,
    updateService
} from '../services/superheroesService.mjs';

import {
    renderizarSuperheroe,
    renderizarListaSuperheroes,
    renderizarMensaje} from '../views/responseView.mjs';

    
    export async function obtenerSuperheroePorIdController(req, res) {
        try {
            const { id } = req.params;
            console.log(`Traerme el ID del SuperHeroe:`, id);
    
            const superheroe = await obtenerSuperheroePorId(id);
            console.log('El SuperHeroe es: ', superheroe);
    
            if (!superheroe) {
                return res.status(404).send({ mensaje: 'Superhéroe no encontrado' });
            }
    
            res.render('modicarSuperHeroe', {
                title: 'Modificar Super Héroe',
                superheroe,  //  Pasamos el objeto superhéroe directamente
                navbarLinks: [
                    { text: 'Inicio', href: '/', icon: '/icons/home.svg' },
                    { text: 'Acerca de', href: '/about', icon: '/icons/info.svg' },
                    { text: 'Contacto', href: '/contact', icon: '/icons/contact.svg' }
                ]
            });
    
        } catch (error) {
            console.error(error);
            res.status(500).send({
                mensaje: 'Error al obtener el superhéroe',
                error: error.message
            });
        }
    }
    

export async function obtenerSuperheroePorIdControllerFunciona(req, res) {
    try {
        const {id} = req.params;
        console.log(`Trerme el ID del SuperHeroe`, id);
        const superheroe = await obtenerSuperheroePorId(id);
        console.log(`Trerme el ID Seleccionado`, superheroe);
        if (!superheroe) {
            return res.status(404).send({ mensaje: 'Superheroe no encontrado' });
        }
        const superheroeFormateado = renderizarSuperheroe(superheroe);
        res.render('superHeroesDelMundo/editar', { superheroeFormateado });
        //res.status(200).json(superheroeFormateado);
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener el superhéroe',
            error: error.message });
    }
}



export async function update(req, res) {
    try {
        const id = req.params.id;
        const updateSP = req.body;
        //const body = req.body;
        const data = await updateService(id, updateSP);
        console.log(`Trerme el ID del SuperHeroe`, id);
        //const superheroe = await obtenerSuperheroePorId(id);
        console.log(`Trerme el ID Seleccionado`, data);
        if (!data) {
            return res.status(404).send({ mensaje: 'Superheroe no encontrado' });
        }        
        const superheroeFormateado = renderizarSuperheroe(data);
        console.log('Me muestra el superheroemodificado', superheroeFormateado);
        res.render('superHeroesDelMundo/editar', { superheroeFormateado });
        res.status(200).json(superheroeFormateado);
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener el superhéroe',
            error: error.message });
    }
}

/*export async function obtenerTodosLosSuperheroesController(req, res) {
    try {
        const superheroes = await obtenerTodosLosSuperheroes();
        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
        //res.render('superHeroesDelMundo/listarTodoslosSHDelMundo', { superheroesFormateados });
        res.render('mostrarAllSH', {superheroesFormateados});
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener los superhéroes',
            error: error.message });
    }
}*/

export async function obtenerTodosLosSuperheroesController(req, res) {
    try {
        const superheroes = await obtenerTodosLosSuperheroes();
        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
        
        res.render('mostrarAllSH', {
            title: 'Lista de Superhéroes',
            superheroesFormateados,
            navbarLinks: [
                { text: 'Inicio', href: '/', icon: '/icons/home.svg' },
                { text: 'Acerca de', href: '/about', icon: '/icons/info.svg' },
                { text: 'Contacto', href: '/contact', icon: '/icons/contact.svg' }
            ]
        });
    } catch (error) {
        res.status(500).send({
            mensaje: 'Error al obtener los superhéroes',
            error: error.message
        });
    }
}


export async function buscarSuperheroesPorAtributoController(req, res) {
    try {
        const {atributo, valor} = req.params;
        const superheroes = await buscarSuperheroesPorAtributo(atributo, valor);
        if (superheroes.length === 0) {
            return res.status(404).send(
                { mensaje: 'No se encontraron superhéroes con ese atributo' });
        }
        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
        res.status(200).json(superheroesFormateados);
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al buscar los superhéroes',
            error: error.message });
    }
}


export async function obtenerSuperheroesMayoresDe30Controller(req, res) {
    try {
        const superheroes = await obtenerSuperheroesMayoresDe30();
        if (superheroes.length === 0) {
            return res.status(404).send(
                { mensaje: 'No se encontraron superhéroes mayores de 30 años' });
        }
        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
        res.status(200).json(superheroesFormateados);
    } catch (error) {
        res.status(500).send(
            { mensaje: 'Error al obtener superhéroes mayores de 30 años',
            error: error.message });
    }
}

export async function agregarSuperHeroesController(req, res) {
    try {
        const agregarNuevoSP = req.body;
        console.log('Nombre del Super Heroe', agregarNuevoSP);
        const superheroeCreado = await agregarNuevoSuperHeroe(agregarNuevoSP);
        console.log(superheroeCreado);
        if (superheroeCreado.length === 0) {
            return res.status(404).send(
                { mensaje: 'No se creo el Super Heroe' });
        }              
        const superheroesFormateado = renderizarSuperheroe(superheroeCreado);       
        res.json({result: 'success'});        
    } catch (error) {
        res.status(500).send(
            { mensaje: 'Error al crear Super Heroe',
            error: error.message });
    }
}

/*export async function modificarSuperHeroesController(req, res){
    try{
    const id = req.params.id;
    const updateSP = req.params;


    
    console.log('Traigo el Super Heroe',updateSP);
    const superHeroemodificado = await modificarSuperHeroeService(id, updateSP);
    //console.log('Mostrar El SuperHereo', superHeroemodificado);
    if (superHeroemodificado.length === 0){
        return res.status(404).send({ mensaje: "No se pudo actualizar el superhéroe" });
    }

    console.log('Entrara por aqui');
   
    console.log('Aqui estan formateados:', superheroeFormateado)
    res.json( {result: 'success', superheroeFormateado});
    //res.status(200).json(superheroeFormateado);
    console.log('Aqui modifico el SuperHeroe')
    } catch (error) {
        res.status(500).send({mensaje: "Error al actualizar el superhéroe",
        error: error.message,
      });
    }
}*/

export async function modificarSuperHeroesController(req, res){
    try {
        const id = req.params.id;
        const updateSP = req.body; // 🔧 Importante
        console.log('Datos a actualizar:', updateSP);

        const superHeroemodificado = await modificarSuperHeroeService(id, updateSP);
        if (!superHeroemodificado) {
            return res.status(404).send({ mensaje: "No se pudo actualizar el superhéroe" });
        }

        // Si querés formatearlo:
        const superheroeFormateado = {
            id: superHeroemodificado._id,
            nombreSuperHeroe: superHeroemodificado.nombreSuperHeroe,
            nombreReal: superHeroemodificado.nombreReal,
            edad: superHeroemodificado.edad,
            planetaOrigen: superHeroemodificado.planetaOrigen,
            debilidad: superHeroemodificado.debilidad,
            poderes: superHeroemodificado.poderes,
            aliados: superHeroemodificado.aliados,
            enemigos: superHeroemodificado.enemigos,
            creador: superHeroemodificado.creador
        };

        return res.json({ result: 'success', superheroeFormateado });
    } catch (error) {
        return res.status(500).send({
            mensaje: "Error al actualizar el superhéroe",
            error: error.message
        });
    }
}


export async function modificar1SuperHeroesController(req, res){
    try{
    const id = req.params.id;
    const body = req.body;  
    const superHeroemodificado = await modificarSuperHeroeService(id, body);
    if (superHeroemodificado.length === 0){
        return res.status(404).send({ mensaje: "No se pudo actualizar el superhéroe" });
    }
    const superheroeFormateado = renderizarSuperheroe(superHeroemodificado);
    //res.status(200).json(superheroeFormateado);
    console.log('Muestro el SuperHeroe Formateado', superheroeFormateado);
    res.json({result: 'success', superheroeFormateado});
    } catch (error) {
        res.status(500).send({mensaje: "Error al actualizar el superhéroe",
        error: error.message,
      });
    }
}

export async function eliminarSuperHeroesController(req, res){
    try{
    const id = req.params.id;
    //const body = req.body;  
    console.log('Ver el ID del Heroe a eliminar', id);
    const superHeroeeliminado = await eliminarSuperHereoPorId(id);

    if (superHeroeeliminado.length === 0){
        return res.status(404).send({ mensaje: "No se pudo Eliminar el superhéroe" });
    }
    //const superheroeFormateado = renderizarSuperheroe(superHeroeeliminado);
    //res.status(200).json(superheroeFormateado);
    //console.log('Muestro el SuperHeroe Formateado', superheroeFormateado);
    res.json({result: 'success'});
    } catch (error) {
        res.status(500).send({mensaje: "Error al actualizar el superhéroe",
        error: error.message,
      });
    }
}
export async function modificarSuperHeroesporIdController(req, res) {
    try {
        const {id, atributo, valor} = req.params;
        const superheroe = await modificarSuperHeroeporEdad(id, atributo, valor);
        console.log('Actualizado:', superheroe);
        if (superheroe.length === 0) {
            return res.status(404).send(
                { mensaje: 'No se encontro el SuperHeroes con esa atributo o valor' });
        }
         //console.log('vererror');        
         
         const superheroesFormateado = renderizarSuperheroe(superheroe);
         //console.log(superheroesFormateado);
         const mostrarSuperHeroeFormateado = await obtenerSuperheroePorId(id);
        console.log('que paso', mostrarSuperHeroeFormateado);   
         res.status(200).json({
             mensaje: "Super Héroe Modificado Exitosamente",
             superheroe: mostrarSuperHeroeFormateado}
             );
        //const superheroesFormateados = renderizarSuperheroe(superheroe);
        //res.status(200).json(superheroesFormateados);
    } catch (error) {
        res.status(500).send(
            { mensaje: 'Error al modificar el Super Heroe',
            error: error.message });
    }
}

/*export async function eliminarSuperheroePorIdController(req, res) {
    try {
        const {id} = req.params;
        console.log('cual es el ID:', id);
        const superheroe = await eliminarSuperHereoPorId(id);
        console.log(superheroe);
        if (!superheroe) {
            return res.status(404).send({ mensaje: 'Superheroe no encontrado' });
        } 
         res.status(200).json({
             mensaje: "Super Héroe Eliminado Exitosamente",
            }
             );
        //const superheroeFormateado = renderizarSuperheroe(superheroe);
        //res.status(200).json(superheroeFormateado);
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al encontrar el ID el superhéroe',
            error: error.message });
    }
}

export async function eliminarSuperheroePorNombreController(req, res) {
    try {
        const { nombre } = req.params;
        console.log('cual es el Nombre:', nombre);
        const superheroe = await eliminarSuperHeroeNombre(nombre);
        console.log('que me trae', superheroe);
        if (!superheroe) {
            return res.status(404).send({ mensaje: 'Superheroe no encontrado' });
        } 
        const superheroeFormateado = renderizarSuperheroe(superheroe);
        //res.status(200).json(superheroeFormateado);
        res.status(200).json({
            mensaje: "Super Héroe Eliminado con éxito",
            superheroe: superheroeFormateado}
            );
        /*res.status(200).json({
             mensaje: "Super Héroe Eliminado Exitosamente",
            }
             );*/
 /*       
    } catch (error) {
        res.status(500)
        .send({ mensaje: 'Error al encontrar el Nombre el superhéroe',
            error: error.message });
    }
}*/