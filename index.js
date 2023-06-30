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
    listado.push(' '+ tipo)
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
    listado.push(' ' + habilidades.replaceAll('-',' '))
    });
    return listado.join()
}

const crearListaNombres = (lista) => {
    let listado = []
    lista.forEach((poke) => {
    nombres = poke.name;
    listado.push(nombres)
    });
    return listado
}

const crearListaUbicacion = (lista) => {
    let listado = []
    lista.forEach((poke) => {
    ubicaciones = poke.location_area.name;
    listado.push(' ' + ubicaciones.replaceAll('-', ' '))
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
        "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1281");

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

tipos().then((response_tipos) => {
    allTypes = response_tipos.results;
    crearListaTipos(allTypes);
});

todos().then((response_todos) => {
    pokemons = response_todos.results;
    crearListaNombres(pokemons)
    return pokemons
});


$entrada.addEventListener("submit", (e) => {
    e.preventDefault()
    var pokemonNombre = $pokemonElegido.value.toLowerCase().replaceAll(' ', '-')
    var flag = false
    let i = 0
    console.log(pokemonNombre)

    while (i <= 1281) {
        if (pokemonNombre == crearListaNombres(pokemons)[i]) {
            flag = true
            break
        }
        i+= 1 }

    console.log(flag)
    if (flag) {
        $name.innerText = pokemonNombre.toUpperCase().replaceAll('-', ' ')
    pokemon(pokemonNombre).then((response_pokemon) => {
        id = response_pokemon.id
        peso = response_pokemon.weight;
        estatura = response_pokemon.height;
        tipo = response_pokemon.types;
        habilidades = response_pokemon.abilities;
        imagen = response_pokemon.sprites.other.dream_world.front_default;
        $picture.src=imagen
        $no.innerText = id
        $tipo.innerText = crearListaTipo(tipo)
        $estatura.innerText = estatura + " dm"
        $peso.innerText = peso + " hg"
        $habilidades.innerText = crearListaHabilidades(habilidades)
    })
    ubicacion(pokemonNombre).then((response_ubicacion) => {
        ubicaciones = response_ubicacion;
        $ubicaciones.innerText = crearListaUbicacion(ubicaciones)
    })
    }
    else {
        $name.innerText = ""
        $no.innerText = ""
        $tipo.innerText = ""
        $estatura.innerText = ""
        $peso.innerText = ""
        $habilidades.innerText = ""
        $ubicaciones.innerText =""
        $picture.src="https://img.freepik.com/free-vector/black-white-spiral-background_1048-16005.jpg?w=2000"
        alert('nombre o pokemon no existe')
        }
})