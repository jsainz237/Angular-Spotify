const keys = require('../keys');
const client_id = keys.client_id;
const client_secret = keys.client_secret;

const express = require('express');
const router = express.Router();

const fetch = require('node-fetch');
const request = require('request');

let token;

// your application requests authorization
var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    //method: 'POST',
    headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
        grant_type: 'client_credentials'
    },
    json: true
};

function retrieveToken() {
    return new Promise(function(resolve, reject) {
        // Do async job
        request.post(authOptions, function(err, resp, body) {
            if (err) {
                reject(err);
            } else {
                resolve(body.access_token);
            }
        })
    })
}

router.get('/', (req, res) => {
    (async () => {
        let token = await retrieveToken();
        //let token = data.access_token;
        //console.log(data)
        res.status(200).json({
            access_token: token
        })
    })()
})

module.exports = router;