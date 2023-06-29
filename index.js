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

const pokemonElegido = 'pikachu'

const tipos = async () => {
    const response_tipos = await fetch(
        "https://pokeapi.co/api/v2/type/");

    return response_tipos.json();
};

const todos = async () => {
    const response_todos = await fetch(
        "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1000");

    return response_todos.json();
}

const pokemon = async (nombre) => {
    const response_pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}/`);

    return response_pokemon.json();
}

const ubicacion = async (nombre) => {
    const response_ubicacion = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${nombre}/encounters`);
    return response_ubicacion.json();
};

// const $picture = document.querySelector("#pokemon-figure")

tipos().then((response_tipos) => {
    allTypes = response_tipos.results;
    crearListaTipos(allTypes);
});

todos().then((response_todos) => {
    pokemons = response_todos.results;
    crearListaNombres(pokemons)
});

pokemon(pokemonElegido).then((response_pokemon) => {
    id = response_pokemon.id
    peso = response_pokemon.weight;
    estatura = response_pokemon.height;
    tipo = response_pokemon.types;
    habilidades = response_pokemon.abilities;
    imagen = response_pokemon.sprites.other.dream_world.front_default;
    console.log(peso)
    console.log(estatura)
    console.log(imagen)
    console.log(id)
    // $picture.src=datos
    crearListaTipo(tipo)
    crearListaHabilidades(habilidades)
});

ubicacion(pokemonElegido).then((response_ubicacion) => {
    ubicaciones = response_ubicacion;
    crearListaUbicacion(ubicaciones)
});