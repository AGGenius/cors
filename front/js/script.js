const showCharacterData = document.getElementById('showCharacterData');
const getCharacterButton = document.getElementById('getCharacterButton');
const getAllCharactersButton = document.getElementById('getAllCharactersButton');
const getCharacterName = document.getElementById('getCharacter');

const getCharacterURL = 'http://localhost:3000/characters/';

getCharacterButton.addEventListener('click', () => {
    if(!getCharacterName.value) { return;   };

    charName = getCharacterName.value;

    fetch(getCharacterURL+charName)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        showCharacters(data, showCharacterData);
    })
    .catch(err => showCharacterData.innerHTML = `${charName} isn't in our database.`);
})

getAllCharactersButton.addEventListener('click', () => {
    fetch(getCharacterURL)
    .then(response => response.json())
    .then(data => {
        const charWrap = document.createElement('section');
        charWrap.id = 'charWrapAll';

        data.forEach(element => {

            showCharacters(element, charWrap);
            
        });  
        showCharacterData.appendChild(charWrap);
    })
    .catch(err => showCharacterData.innerHTML = `Error getting character: ${err}`);
})

function showCharacters(data, dom){
    charBox = document.createElement('article');
    charBox.id = 'charWrap';

    const {nombre, estado, especie, genero, origen, imagen} = data;
    showCharacterData.innerHTML = '';

    charBox.innerHTML = `
        <h2>${nombre}</h2>
        <p>Status: ${estado}</p>
        <p>Species: ${especie}</p>
        <p>Gender: ${genero}</p>
        <p>Origin: ${origen}</p>
        <img src="${imagen}" alt="${nombre} image" />    
    `;   
    
    dom.append(charBox);
}