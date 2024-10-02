const main = document.querySelector('main');

async function getPokemon() {
    for (let i = 0; i < 6; i++) {
        let random = Math.floor(Math.random() * 1025) + 1;
        const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${random}`);
        const dados = await resp.json();

        const section = `<div class="section">
            <h2>${dados.name}</h2>
            <div class="item-img">
                <img src="${dados.sprites.front_default}">
            </div>
            <p>
                <strong>Type: </strong> <span>${dados.types.map((t => t.type.name))}</span>
            </p>
            <p>
                <strong>Abilities: </strong> <span>${dados.abilities.map(a => a.ability.name)}</span>
            </p>
        </div>`

        main.innerHTML += section;
    }
}

window.addEventListener('DOMContentLoaded', getPokemon());

document.querySelector('#formulario').addEventListener('submit', async (event) => {
    event.preventDefault();

    const input = document.querySelector('input').value.toLowerCase();
    const respSearch = await fetch( `https://pokeapi.co/api/v2/pokemon/${input}`);
    const dadosSearch = await respSearch.json();
    console.log(dadosSearch)

    if (dadosSearch.count === 1302) {
        alert('Vazio')
    } else {
            const result = `<div class="section">
    <h2>${dadosSearch.name}</h2>
            <div class="item-img">
                <img src="${dadosSearch.sprites.front_default}">
            </div>
            <p>
                <strong>Type: </strong> <span>${dadosSearch.types.map((t => t.type.name))}</span>
            </p>
            <p>
                <strong>abilities: </strong> <span>${dadosSearch.abilities.map(a => a.ability.name)}</span>
            </p>
        </div>`
        main.innerHTML = result;
    }
})
let numClick= 0;
document.querySelector('#verMais').addEventListener('click', function(){
    numClick++;
    window.addEventListener('DOMContentLoaded', getPokemon());
    if(numClick===10){
        this.disabled = true;
        this.style.cursor = 'not-allowed';
    }
});