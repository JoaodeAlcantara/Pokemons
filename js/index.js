const main = document.querySelector('main');

async function getPokemon() {
    for(let i=0;i<6; i++){
        let random = Math.floor(Math.random() *150) +1;
        const url = `https://pokeapi.co/api/v2/pokemon/${random}`
        const resp = await fetch(url);
        const dados = await resp.json();

        const section = `<div class="section">
            <h2>${dados.name}</h2>
            <div class="item-img">
                <img src="${dados.sprites.front_default}">
            </div>
            <p>
                <strong>Tipo: </strong> <span>${dados.types.map((t => t.type.name))}</span>
            </p>
            <p>
                <strong>Habilidade: </strong> <span>${dados.abilities.map(a => a.ability.name)}</span>
            </p>
        </div>`

    main.innerHTML += section;
    }
}

window.addEventListener('DOMContentLoaded', getPokemon());

document.querySelector('#formulario').addEventListener('submit', async (event) => {
    event.preventDefault();

    const input = document.querySelector('input').value.toLowerCase()
    const urlSearch = `https://pokeapi.co/api/v2/pokemon/${input}`;
    const respSearch = await fetch(urlSearch);
    const dadosSearch = await respSearch.json();
    console.log(dadosSearch)

    const result = `<div class="section">
    <h2>${dadosSearch.name}</h2>
            <div class="item-img">
                <img src="${dadosSearch.sprites.front_default}">
            </div>
            <p>
                <strong>Tipo: </strong> <span>${dadosSearch.types.map((t => t.type.name))}</span>
            </p>
            <p>
                <strong>Habilidade: </strong> <span>${dadosSearch.abilities.map(a => a.ability.name)}</span>
            </p>
        </div>`
    main.innerHTML = result;
})