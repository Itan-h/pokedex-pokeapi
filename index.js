const $pokemonElegido = document.querySelector("#search-bar")
const $frameTipos = document.querySelector("#tipos-pokemon")
const $picture = document.querySelector("#pokemon-picture")
const $entrada = document.querySelector("#formulario")
const $no = document.querySelector("#no")
const $tipo = document.querySelector("#tipo")
const $estatura = document.querySelector("#estatura")
const $peso = document.querySelector("#peso")
const $habilidades = document.querySelector("#habilidades")
const $ubicaciones = document.querySelector("#ubicaciones")
const $name = document.querySelector("#name")

const crearListaTipo = (lista) => {
    let listado = []
    lista.forEach((poke) => {
    tipo = poke.type.name;
    listado.push(tipo)
    });
    return listado.join()
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
    return listado.join()
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
    return listado.join()
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


$entrada.addEventListener("submit", (e) => {
    e.preventDefault()
    var pokemonNombre = $pokemonElegido.value
    console.log(pokemonNombre)

    $name.innerText = pokemonNombre.toUpperCase()
pokemon(pokemonNombre).then((response_pokemon) => {
    id = response_pokemon.id
    peso = response_pokemon.weight;
    estatura = response_pokemon.height;
    tipo = response_pokemon.types;
    habilidades = response_pokemon.abilities;
    imagen = response_pokemon.sprites.other.dream_world.front_default;
    $no.innerText = id
    $tipo.innerText = crearListaTipo(tipo)
    $estatura.innerText = estatura + " dm"
    $peso.innerText = peso + " hg"
    $habilidades.innerText = crearListaHabilidades(habilidades)
    console.log(peso)
    console.log(estatura)
    console.log(imagen)
    $picture.src=imagen
    // console.log(crearListaHabilidades(habilidades))
    // console.log(crearListaTipo(tipo))
})

ubicacion(pokemonNombre).then((response_ubicacion) => {
    ubicaciones = response_ubicacion;
    $ubicaciones.innerText = crearListaUbicacion(ubicaciones)
})
})
