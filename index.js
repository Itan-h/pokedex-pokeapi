const $pokemonElegido = document.querySelector("#search-bar")
const $buscar = document.querySelector("#icon-search-bar")
const $frameTipos = document.querySelector("#tipos-pokemon")
const $picture = document.querySelector("#pokemon-picture")
const $entrada = document.querySelector("#formulario")

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
    const genreButton = document.createElement("button")
    types = poke.name;
    genreButton.innerText = types
    genreButton.classList.add("direccionTipo")
    $frameTipos.appendChild(genreButton)
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


$buscar.addEventListener("click", () => {})
$entrada.addEventListener("submit", (e) => {
    e.preventDefault()
    var pokemonNombre = $pokemonElegido.value
    console.log(pokemonNombre)


pokemon(pokemonNombre).then((response_pokemon) => {
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
    $picture.src=imagen
    crearListaTipo(tipo)
    crearListaHabilidades(habilidades)
})

ubicacion(pokemonNombre).then((response_ubicacion) => {
    ubicaciones = response_ubicacion;
    crearListaUbicacion(ubicaciones)
})
})
