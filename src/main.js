const _request = require('./request_handler/request')
const data = require('./data/categories.json')

class API {
    constructor(){
        this._request = _request;
    }
    get baseURL(){
        return `https://opentdb.com`
    }
    get main_endpoint(){
        return `/api.php`
    }
    get full_url(){
        return `${this.baseURL}${this.main_endpoint}`
    }
    /**
     * 
     * @param {object} options
     * @example
     * const tdb_API = require('tdb-api');
     * const API = new tdb_API();
     * API.getQuestions({amount: 5, category: 'Sports', difficulty: 'Hard'})
     * .then(res => {
     *      console.log(res)
     * })
     * @returns {object} 
     */
async getQuestions(options = {amount: 10, category: '', difficulty: 'medium'}){
    let path = this.main_endpoint;
    let categories = {};
    let allCategories = data;

    for (let i = 9; i < allCategories.length; i++){
        categories[allCategories[i]] = i;
    }
    if (options.category && options.category.length > 0){
        if (!categories[options.category]) throw new TypeError(`Invalid Category: Choose one of the following: ${Object.keys(categories).join(' | ')}`);

        return new Promise(async (resolve, reject) => {
            let response = await this._request(path, options)
            return resolve({
                data: response.results
            })
        })
    } else {
        return new Promise((async (resolve, reject) => {
            let num = Math.floor(Math.random() * allCategories.length);
            let category = categories[Object.keys(categories)[num]];
            delete options.category;
            let res = await this._request(path, {amount: options.amount, category: category, difficulty: options.difficulty})

            return resolve({
                data: res.results
            })
        })
        )}
    }
}

module.exports = API;