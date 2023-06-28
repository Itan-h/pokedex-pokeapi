const crearListaTipo = (lista) => {
    let listado = []
    lista.forEach((poke) => {
    tipo = poke.type.name;
    listado.push(tipo)
    });
    console.log(listado.join())
}

const crearListaTipos = (lista) => {
    let listado = []
    lista.forEach((poke) => {
    types = poke.name;
    listado.push(types)
    });
    console.log(listado)
}

const crearListaHabilidades = (lista) => {
    let listado = []
    lista.forEach((poke) => {
    habilidades = poke.ability.name;
    listado.push(habilidades.replaceAll('-',' '))
    });
    console.log(listado.join())
}

const crearListaNombres = (lista) => {
    let listado = []
    lista.forEach((poke) => {
    nombres = poke.name;
    listado.push(nombres)
    });
    console.log(listado)
}

const crearListaUbicacion = (lista) => {
    let listado = []
    lista.forEach((poke) => {
    ubicaciones = poke.location_area.name;
    listado.push(ubicaciones.replaceAll('-', ' '))
    });
    console.log(listado.join())
}

const tipos = async () => {
    const response = await fetch(
        "https://pokeapi.co/api/v2/type/");

    return response.json();
};

const todos = async () => {
    const enlace = await fetch(
        "https://pokeapi.co/api/v2/pokemon/");

    return enlace.json();
}

const pokemon = async (nombre) => {
    const referencia = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}/`);

    return referencia.json();
}

const ubicacion = async (nombre) => {
    const respuesta = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${nombre}/encounters`);
    return respuesta.json();
};

// const $picture = document.querySelector("#pokemon-figure")

tipos().then((response) => {
    allTypes = response.results;
    crearListaTipos(allTypes);
});

todos().then((enlace) => {
    pokemons = enlace.results;
    crearListaNombres(pokemons)
});

pokemon('togepi').then((referencia) => {
    tipo = referencia.types;
    habilidades = referencia.abilities;
    imagen = referencia.sprites.other.dream_world.front_default;
    // $picture.src=datos
    crearListaTipo(tipo)
    crearListaHabilidades(habilidades)
});

ubicacion('togepi').then((respuesta) => {
    ubi = respuesta;
    crearListaUbicacion(ubi)
});