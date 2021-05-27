const _request = require('./RequestHandler/request')

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
    
    }
}