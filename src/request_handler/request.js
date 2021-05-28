const fetch = require('node-superfetch');

async function _request(path, query = {}){
    let baseURL = 'https://opentdb.com';
    return new Promise((resolve, reject) => {
        let regex = /^\/([A-Za-z]{3})\.([A-Za-z]{3})$/g;
        let urlMatch = regex.exec(path);
        if (!urlMatch) reject(new Error('Invalid Path'));

        let endpoint = `/${urlMatch.slice(1).join('.')}`
        let queryString = Object.keys(query).lenght>0?query:false;
        let url;

        if (!queryString){
            url = `${baseURL}${endpoint}`
        } else {
            url = `${baseURL}${endpoint}?`

        for (const [query, val] of Object.entries(queryString)){
            url += `${query}=${val}&`
        }

        let response = await fetch.get(url);

        if (!response.ok || response.status !== 200) reject(new Error(`${response.statusText}`))
        
        return resolve(response.body)
        }
    })
}

module.exports = _request;