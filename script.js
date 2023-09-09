const typeColor = {
bug: '#26de81',
	dragon: '#46006e',
	electric: '#fff612',
	fairy: '#ff82c4',
	fighting: '#a80022',
	fire: '#ffac19',
	flying: '#81ecec',
	grass: '#6fdc78',
	ground: '#EFB549',
	ghost: '#580083',
	ice: '#0cdbff',
	normal: '#b7fffd',
	poison: '#d1005e',
	psychic: '#ff4e80',
	rock: '#2d3436',
	water: '#0190FF',
  dark: '#330026',
  steel: '#a0a0a0',
}


const url ='https://pokeapi.co/api/v2/pokemon/'
const card = document.querySelector('#card')
const btn = document.querySelector('#btn')

function getPokemon(){
    let id = Math.floor(Math.random() * 1008) + 1
    const finalUrl = url + id

    fetch(finalUrl).then(res => res.json()).then(data => genCard(data))
}

function genCard(data){
    console.log(data)

    const hp = data.stats[0].base_stat
    const pokeName = data.name
    const attack = data.stats[1].base_stat
    const defense = data.stats[2].base_stat
    const speed = data.stats[5].base_stat
    const imgSrc = data.sprites.other["official-artwork"].front_default

    console.log(hp, pokeName, attack, defense, speed, imgSrc)

    card.innerHTML = `
    <p class="hp">
        <span>HP</span>
        ${hp}
    </p>
    <img src=${imgSrc} alt=${pokeName}/>
    <h2 class="poke-name">${pokeName}</h2>

    <div class="types"></div>

    <div class="stats">
        <div>
            <h3>${attack}</h3>
            <p>Attack</p>
        </div>

        <div>
            <h3>${defense}</h3>
            <p>Defense</p>
        </div>

        <div>
            <h3>${speed}</h3>
            <p>Speed</p>
        </div>
    </div>
    `

    appendTypes(data.types)
    const themeColor = typeColor[data.types[0].type.name]
    styleCard(themeColor)
}

function appendTypes(types){
    types.forEach(item => {
        let span = document.createElement('span')
        span.textContent = item.type.name
        document.querySelector('.types').appendChild(span)
    })
}

function styleCard(color){
    card.style.background = `radial-gradient(circle at 50% 0%, ${color} 36%, #fff 36%)`

    card.querySelectorAll('.types span').forEach(badget => {
        badget.style.backgroundColor = typeColor[badget.innerText]
    })
}

btn.addEventListener('click', getPokemon)
window.addEventListener('load', getPokemon)