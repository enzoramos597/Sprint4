//Implementa la lógica de negocio, con los métodos de repositorio
//Para búsqueda, recuperción y filtrado de datos.

import SuperHeroRepository from '../repositories/SuperHeroRepository.mjs';

export async function obtenerSuperheroePorId(id) {
    return await SuperHeroRepository.obtenerPorId(id);
}

export async function obtenerTodosLosSuperheroes() { 
    return await SuperHeroRepository.obtenerTodos();
} 

export async function updateService(id) {
    return await SuperHeroRepository.updateRepository(id);
}
export async function buscarSuperheroesPorAtributo(atributo, valor) {
    return await SuperHeroRepository.buscarPorAtributo(atributo, valor)
}

export async function obtenerSuperheroesMayoresDe30() {
    return await SuperHeroRepository.obtenerMayoresDe30();
}

export async function agregarNuevoSuperHeroe(agregarNuevoSP) {
    return await SuperHeroRepository.agregarNuevoSuperHeroeEnzo(agregarNuevoSP);
}

export async function modificarSuperHeroeporEdad(id, atributo, valor) {
    return await SuperHeroRepository.modificarSuperHeroeporEdad(id, atributo, valor);
}

export async function modificarSuperHeroeService(id, datosActualizados){
    return await SuperHeroRepository.updateRepository1SuperHereo(id, datosActualizados);
}

export async function eliminarSuperHereoPorId(id) {
    return await SuperHeroRepository.eliminarPorId(id);
}

export async function eliminarSuperHeroeNombre(nombre) {
    return await SuperHeroRepository.eliminarSuperHeroeNombre(nombre);
}