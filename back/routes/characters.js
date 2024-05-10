const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/characters', async (req, res) => {
    const apiEndP = 'https://rickandmortyapi.com/api/character';

    try {       
        const response = await axios.get(apiEndP);
        const characters = [];

        const data = response.data;

        data.results.forEach(element => {
            const {name, status, species, gender, origin, image} = element
            const character = {
                "nombre": name,
                "estado": status,
                "especie": species,
                "genero": gender,
                "origen": origin.name,
                "imagen": image
            };
            characters.push(character);
        });

        res.json(characters);
    } catch(err) {
        res.status(404).json({ error: `Couldn't reach the API: ${err}`});
    }
})

router.get('/characters/:name', async (req, res) => {       
    const charName = req.params['name'].toLowerCase();     
    const apiEndP = `https://rickandmortyapi.com/api/character/?name=${charName}`;

    try {
        const response = await axios.get(apiEndP);

        const data = response.data.results;

        const {name, status, species, gender, origin, image} = data[0]
        const character = {
            "nombre": name,
            "estado": status,
            "especie": species,
            "genero": gender,
            "origen": origin.name,
            "imagen": image
        };


        res.json(character); // Solo lanzamos el resultado mas cercano a la busqueda, que sera el primero.
    } catch(err) {
        res.status(404).json({ error: `${charName} isn't in our database. Err: ${err}`});
    }
})

module.exports = router;