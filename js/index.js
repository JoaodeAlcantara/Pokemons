const main = document.querySelector('main');

const btns = Array.from(document.querySelectorAll('.filtro'));
const all = document.querySelector('#all');
all.classList.add('check');
const filterType = [];


btns.map(element => element.addEventListener('click', (e) => {
    const type = e.target.innerHTML;

    if (e.target.classList.contains('check')) {
        const index = filterType.indexOf(type);
        filterType.splice(index, 1);
    } else {
        filterType.push(type);
    }
    e.target.classList.toggle('check');

    const hasActiveFilter = btns.some(btn => btn.classList.contains('check'));

    if (hasActiveFilter) {
        all.classList.remove('check');
    } else {
        all.classList.add('check');
    }
}));


all.addEventListener('click', () => {
    all.classList.add('check');
    filterType.length = 0;
    btns.forEach(btn => btn.classList.remove('check'));

    const sections = main.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.display = 'block';
    });
});

class CardPokemon {
    constructor(n, i, t, a) {
        this.nome = n;
        this.img = i;
        this.type = t;
        this.ability = a;
    }

    CreateCard() {
        const section = `<div class="section">
            <h2>${this.nome}</h2>
            <div class="item-img">
                <img src="${this.img}">
            </div>
            <p>
                <strong>Type: </strong> <span>${this.type.join(', ')}</span>
            </p>
            <p>
                <strong>Abilities: </strong> <span>${this.ability.join(', ')}</span>
            </p>
        </div>`;
        return section;
    }
}

const selectedTypes = [];
const listRandom = [];

async function getPokemon() {
    main.innerHTML = '';

    for (let i = 0; i < 21; i++) {
        let random = Math.floor(Math.random() * 1025) + 1;
        listRandom.push(random);
    }

    for (let index of listRandom) {
        const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${index}`);
        const dados = await resp.json();
        const pokemon = new CardPokemon(dados.name, dados.sprites.front_default,
            dados.types.map(t => t.type.name), dados.abilities.map(a => a.ability.name));

        main.innerHTML += pokemon.CreateCard();
    }
    listRandom.length = 0;
}

function applyFilters() {
    const sections = main.querySelectorAll('.section');

    const selectedBtns = document.querySelectorAll('.check');
    const selectedTypes = Array.from(selectedBtns).map(btn => btn.textContent.toLowerCase());

    sections.forEach(section => {
        const type = section.querySelector('p span').textContent;
        const typesArray = type.split(', ');

        if (selectedTypes.length > 0) {
            const match = typesArray.some(t => selectedTypes.includes(t));
            section.style.display = match ? 'block' : 'none'
        } else {
            section.style.display = 'block';
        }
    });
}

document.getElementById('filtrar').addEventListener('click', function () {
    applyFilters();
});

window.addEventListener('DOMContentLoaded', getPokemon());

document.querySelector('#formulario').addEventListener('submit', async (event) => {
    event.preventDefault();

    const input = document.querySelector('input').value.toLowerCase();
    const erro = document.querySelector('.error');

    try {
        const respSearch = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);

        if (!respSearch.ok) {
            throw new Error(`Pokemon não encontrado! erro:${respSearch.status}`)
        }
        const dadosSearch = await respSearch.json();
        console.log(dadosSearch)
        
        const result = new CardPokemon(dadosSearch.name, dadosSearch.sprites.front_default,
            dadosSearch.types.map((t => t.type.name)), dadosSearch.abilities.map(a => a.ability.name)
        )
        main.innerHTML = result.CreateCard();
        document.querySelector('input').value = ''
    } catch (error){
        console.error('Erro ao encontrar o pokemon:', error);
            erro.style.display = 'block'
            erro.innerHTML = `Pokemon não encontrado`;
        setTimeout( () => {
            erro.style.display = 'none'
        }, 2000)
    }
})

let numClick = 0;
document.querySelector('#verMais').addEventListener('click', function () {
    numClick++;
    window.addEventListener('DOMContentLoaded', getPokemon());
    if (numClick === 10) {
        this.disabled = true;
        this.style.cursor = 'not-allowed';
    }
});

const menu = document.querySelector('#menu');
const nav = document.querySelector('#nav');

menu.addEventListener('click', () => {
    if (nav.style.display === 'none' || nav.style.display === '') {
        nav.style.display = 'block'
    } else {
        nav.style.display = 'none'
    }
})
