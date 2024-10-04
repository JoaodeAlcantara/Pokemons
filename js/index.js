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

class Filter {
    constructor(n, i, t, a) {
        this.nome = n;
        this.img = i;
        this.type = t;
        this.ability = a;
    }

    filer() {
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
        const pokemon = new Filter(dados.name, dados.sprites.front_default,
            dados.types.map(t => t.type.name), dados.abilities.map(a => a.ability.name));

        main.innerHTML += pokemon.filer();
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
    const respSearch = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);
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
