const express = require('express');
const router = express.Router();

const fetch = require('node-fetch');
const request = require('request');

function searchArtist(artist, access_token) {
    
    let options = {
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    }

    let url = `https://api.spotify.com/v1/search?q=${artist}&type=artist&limit=20`;
    return new Promise(function(resolve, reject) {
        // Do async job
        fetch(url, options)
            .then(res => res.json())
            .then(jsonResponse => {
                let data = jsonResponse;
                if(!data.artists) {
                    reject(data.error);
                }
                else resolve(data.artists);
            })

            .catch(err => {
                reject(err)
            })
            
    })
}

router.get('/', (req, res) => {
    (async () => {
        let artist = req.query.artist;
        let token = req.header('Token');
        let results;
        try {
            let results = await searchArtist(artist, token);
            res.status(200).json({
                artists: results,
                token
            })
        } catch(e) {
            res.status(e.status).json({
                error: e
            })
        }
    })()
})

module.exports = router;