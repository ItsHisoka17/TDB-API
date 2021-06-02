const fetch = require('node-superfetch');
const querystring = require('querystring');

/**
 * 
 * @param {string} path 
 * @param {object} query
 * @returns {Promise<object>}
 */
async function _request(path, query = {}){
    let baseURL = 'https://opentdb.com';
    return new Promise(async (resolve, reject) => {
        let regex = /^\/([A-Za-z]{3})\.([A-Za-z]{3})$/g
        let urlMatch = regex.exec(path);
        if (!urlMatch) reject(new Error('Invalid Path'));

        let endpoint = `/${urlMatch.slice(1).join('.')}`
        let queryString = querystring.stringify(query)
        let url;

        if (!queryString){
            url = `${baseURL}${endpoint}`
        } else {
            url = `${baseURL}${endpoint}?${queryString}`
        }
        let response = await fetch.get(url);

        if (!response.ok || response.status !== 200) {
            reject(new Error(response.statusText.length>0?response.statusText:'Unknown API Error'))
        }
        resolve(response.body)
    })
}

module.exports = _request;