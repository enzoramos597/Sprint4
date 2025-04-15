//Define las funciones de presentación de datos.
//Organiza la información de los superhéroes en un formato estructurado.

export function renderizarSuperheroe(superheroe) {
    return {
        id: superheroe._id,
        Nombre: superheroe.nombreSuperHeroe,
        "Nombre Real": superheroe.nombreReal,
        Edad: superheroe.edad,
        "Planeta de Origen": superheroe.planetaOrigen,
        Debilidad: superheroe.debilidad,
        Poderes: superheroe.poderes,
        Aliados: superheroe.aliados,
        Enemigos: superheroe.enemigos,
        "Creador": superheroe.creador
    };
}

export function renderizarListaSuperheroes(superheroes) {
    //console.log(superheroes);
    return superheroes.map((superheroe) => renderizarSuperheroe(superheroe));
}

export function renderizarMensaje(mensaje) {
    // Envuelve un mensaje en formato JSON
    return JSON.stringify({ mensaje }, null, 2);
}