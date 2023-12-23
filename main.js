const URL_BASE = "https://pokeapi.co/api/v2/"
const endpoint_todos = "pokemon/"
const customPokedex = JSON.parse(localStorage.getItem("customPokedex")) || [];


const button = document.querySelector("#getPokemons")

//Función para cargar los pokemones de la API
async function cargarPokemones(){
    const pokemones = await fetch(URL_BASE + endpoint_todos)
    const data = await pokemones.json()
    data.results.forEach(async (pokemon) =>{
        //Traigo todos los pokemones
        const pokemones = await fetch(URL_BASE + endpoint_todos + pokemon.name)
        const data = await pokemones.json()
        const contenedor = document.querySelector("#pokemon-container")
        const img = document.createElement("img")
        const card = document.createElement("div")
        const parrafo = document.createElement("p")
        card.classList.add("un-pokemon");
        img.src = data.sprites.front_default
        parrafo.innerText = pokemon.name
        //Muestro en el HTML
        card.appendChild(img)
        card.appendChild(parrafo)
        contenedor.appendChild(card)
        seleccionarPokemones(card, pokemon.name)
        
    })
    nextButton()
    customPokedex.forEach(async (pokemonName) => {
        const pokemones = await fetch(URL_BASE + endpoint_todos + pokemonName);
        const data = await pokemones.json();
        const contenedor = document.querySelector("#pokedex");

        const listItem = document.createElement("li");
        listItem.textContent = pokemonName;
        contenedor.appendChild(listItem);
    });

}

const nextButton = () => {
    const containerButton = document.querySelector("#containerButton")
    const button = document.createElement("button")
    button.innerText = 'Siguiente'
    containerButton.appendChild(button)
}

cargarPokemones();

function seleccionarPokemones(card, pokemonName) {
    card.addEventListener("click", () => {
        card.classList.toggle("seleccionado");
        // Agregar al array cuando se selecciona
        card.classList.contains("seleccionado")
        ? customPokedex.length <= 4
        ? customPokedex.push(pokemonName)
        : Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Sólo puedes almacenar hasta 5 pokemones en tu Pokedex",
            footer: ''
        })
        : (() => {
            const index = customPokedex.indexOf(pokemonName);
            if (index !== -1) {
                customPokedex.splice(index, 1);
            }
        })();
      // Muestro el array en la consola para verificar
    console.log("Pokemones seleccionados:", customPokedex);
    });
}

const pokedexContainer = document.querySelector("#pokedex")
  // Evento para guardar los pokemones seleccionados al presionar el botón
const saveButton = document.querySelector("#savePokemones");
saveButton.addEventListener("click", () => {
  // Muestro en consola los pokemones seleccionados
    console.log("Guardando Pokemones en el Pokedex:", customPokedex);
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Pokedex almacenada!",
        showConfirmButton: false,
        timer: 1500
    });
  //Vacío el pokedex
pokedexContainer.innerHTML = "";
const tituloPokedex = document.createElement("h3");
tituloPokedex.innerText = "Tu pokedex:"
pokedexContainer.appendChild(tituloPokedex);
// Creo un elemento de lista para cada Pokémon en el Pokedex
customPokedex.forEach((pokemon) => {
    const listItem = document.createElement("li");
    listItem.textContent = pokemon;
    pokedexContainer.appendChild(listItem);
});
  //Agrego al local storage
localStorage.setItem("customPokedex", JSON.stringify(customPokedex));

});

const clearPokedexButton = document.querySelector("#clearPokedex");
clearPokedexButton.addEventListener("click", () => {
    // Limpiar la Pokédex
    customPokedex.length = 0;

    // Limpiar la interfaz
    const pokedexContainer = document.querySelector("#pokedex");
    pokedexContainer.innerHTML = "<h3>Tu pokedex:</h3>";

    // Actualizar el localStorage
    localStorage.removeItem("customPokedex");

    // Mensaje de éxito
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Pokédex limpiada",
        showConfirmButton: false,
        timer: 1500
    });
});