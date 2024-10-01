document.getElementById('pesq').addEventListener('click', () => {
    const form = document.querySelector('#formulario');
    if (form.style.display === 'none' || form.style.display === '') {
        form.style.display = 'block'
    } else {
        form.style.display = 'none'
    }
})

async function getPokemon() {
    const pokemons = [];
    for (let i = 0; i < 6; i++) {
        const random = Math.floor(Math.random() * 150) + 1;
        const url = `https://pokeapi.co/api/v2/pokemon/${random}`;
        pokemons.push(fetch(url).then(resp => resp.json()));
    }
    const dados = await Promise.all(pokemons);
    dados.forEach(sectionPokemon);
    console.log(dados)
    sectionPokemon(dados);
}

const main = document.querySelector('main');

function sectionPokemon(dados) {
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

