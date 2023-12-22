const URL_BASE = "https://pokeapi.co/api/v2/"
const endpoint_todos = "pokemon/"
const customPokedex = [];

const listaPokemones = JSON.parse(localStorage.getItem("pokemones")) || [];
const button = document.querySelector("#getPokemons")

async function cargarPokemones(){
    const pokemones = await fetch(URL_BASE + endpoint_todos)
    const data = await pokemones.json()
    console.log(data)
   
    data.results.forEach(async (pokemon) =>{
        const pokemones = await fetch(URL_BASE + endpoint_todos + pokemon.name)
        const data = await pokemones.json()
        const contenedor = document.querySelector("#pokemon-container")
        const img = document.createElement("img")
        const card = document.createElement("div")
        const parrafo = document.createElement("p")
        card.classList.add("un-pokemon");
        img.src = data.sprites.front_default
        parrafo.innerText = pokemon.name
        card.appendChild(img)
        card.appendChild(parrafo)
        contenedor.appendChild(card)
        seleccionarPokemones(card)
    })
}

const nextButton = () => {
    const containerButton = document.querySelector("#containerButton")
    const button = document.createElement("button")
    button.innerText = 'Siguiente'
    containerButton.appendChild(button)
}

cargarPokemones();

function seleccionarPokemones (card){
    card.addEventListener("click", () =>{
        card.classList.toggle("seleccionado")
    })
}

