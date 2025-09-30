setTimeout(function(){
    console.log("async");
}, 2000);

console.log("synchronous")

const urlList = "https://pokeapi.co/api/v2/pokemon";

async function getPokemonList(url) {
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json(); // take the json and turn into a javaScript object
        doStuffList(data);
    }
}

function doStuffList(data) {
    console.log(data);
    const pokeListElement = document.querySelector("#outputList");
    const pokeList = data.results;
    pokeList.forEach((currentItem) => {
        const html = `<li>${currentItem.name}</li>`;
        pokeListElement.innerHTML += html;
    });
}

getPokemonList(urlList);



const url = "https://pokeapi.co/api/v2/pokemon/ditto"

async function getPokemon(url) {
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json(); // take the json and turn into a javaScript object
        doStuff(data);
    }
}

function doStuff(data) {
    console.log(data);
    const outputElement = document.querySelector("#output");
    const html = `<h2>${data.name}<h2><img src=${data.sprites.front_default} alt=${data.name}>`;
    outputElement.innerHTML = html;
    console.log("first", data);
}

getPokemon(url);