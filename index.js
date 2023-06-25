const crearListaTipos = (lista) => {
    lista.forEach((type) => {
    tipos = type.name;
    // console.log(tipos);
    });
}

const crearListaNombres = (lista) => {
    lista.forEach((type) => {
    tipos = type.name;
    // console.log(tipos);
    });
}

const getPopular = async () => {
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

const ubicaciones = async (nombre) => {
    const direccion = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}/encounters`);

    return direccion.json();
}

// const $picture = document.querySelector("#pokemon-figure")

getPopular().then((response) => {
    allTypes = response.results;
    crearListaTipos(allTypes);
});

todos().then((enlace) => {
    pokemons = enlace.results;
    crearListaNombres(pokemons);
});

pokemon('togepi').then((referencia) => {
    
    tipo = referencia.types;
    habilidades = referencia.abilities;
    imagen = referencia.sprites.front_default;
    // $picture.src=datos
    // console.log(habilidades);
    // console.log(imagen);
    console.log(tipo);
});

ubicaciones('togepi').then((direccion) => {
    lugar = direccion;
    región = direccion.region;
    console.log(lugar)
    console.log(región)
});