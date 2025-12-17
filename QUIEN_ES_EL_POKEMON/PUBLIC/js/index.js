const playBtn = document.querySelector('#play');
const choices = document.querySelector('#choices');
const main = document.querySelector('main');
const pokemonImage = document.querySelector('#pokemon-image');
const textOverlay = document.querySelector('#text-overlay');

let gameData;

const revealPokemon = () => {
    main.classList.add('revealed');
    textOverlay.textContent = gameData.correctAnswer.name;
}

const showSiluette = () => {
    main.classList.remove('fetching');
    pokemonImage.src = gameData.correctAnswer.image;

}

const displayChoices = () => {
    const { pokemonChoices } = gameData;
    const choisesHTLM = pokemonChoices.map(pokemon => {
        return `<button data-name="${pokemon.name}"> ${pokemon.name} </button>`;
    }).join('');

    choices.innerHTML = choisesHTLM;
};

const resetImage = () => {
    pokemonImage.src = '';
    main.classList.add('fetching');
    main.classList.remove('revealed');
}

const fetchData = async () => {
    resetImage();
    gameData = await window.getPokeData();
    showSiluette();
    displayChoices();
    //console.log(gameData)
}

playBtn.addEventListener('click', fetchData);

choices.addEventListener('click', (e) => {
    const { name } = e.target.dataset;
    const resultClass = (name === gameData.correctAnswer.name) ? 'correct' : `incorrect`;
    e.target.classList.add(resultClass);
    revealPokemon();
});