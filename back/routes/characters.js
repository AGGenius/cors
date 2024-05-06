const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/characters', async (req, res) => {
    const apiEndP = 'https://rickandmortyapi.com/api/character';

    try {       
        const response = await axios.get(apiEndP);
        data = response.data;

        res.json(data.results);
    } catch(err) {
        res.status(404).json({ error: `Couldn't reach the API: ${err}`});
    }
})

router.get('/characters/:name', async (req, res) => {       
    const charName = req.params['name'].toLowerCase();     
    const apiEndP = `https://rickandmortyapi.com/api/character/?name=${charName}`;

    try {
        const response = await axios.get(apiEndP);
        data = response.data;

        res.json(data.results[0]); // Solo lanzamos el resultado mas cercano a la busqueda, que sera el primero.
    } catch(err) {
        res.status(404).json({ error: `${charName} isn't in our database. Err: ${err}`});
    }
})

module.exports = router;