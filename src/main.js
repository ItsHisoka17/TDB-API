const data = require('./data/categories.json');
const fetch = require('node-superfetch');
const _request = require('./request_handler/request');

/**
 * @type {"General Knowledge" | "Books" | "Films" | "Music" | "Musical & Theatre" | "TV" | "Video Games" | "Board Games" | "Science & Nature" | "Computers" | "Mathematics" | "Mythology" | "Sports" | "Geography" | "History" | "Politics" | "Art" | "Celebrities" | "Animals" | "Vehicles" | "Comics" | "Gadgets" | "Anime & Manga" | "Cartoons & Animations"}
 * @private
 */
const category_type = null;

/**
 * @type {'easy' | 'medium' | 'hard'}
 * @private
 */
const difficulty_type = null;

class API {
    constructor(){
        this._request = _request;

        this.session_tokens = [];
        
        this.categories = {};
        
        Object.assign(this.categories, data)
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
     * @param {{ amount: number, category: category_type, difficulty: difficulty_type, token: null | string }} options
     * @example
     * const tdb_API = require('tdb-api');
     * const API = new tdb_API();
     * API.getQuestions({amount: 5, category: 'Sports', difficulty: 'Hard'})
     * .then(res => {
     *      console.log(res)
     * })
     * @returns Promise<{category: string, type: string, difficulty: string, question: string, correct_answer: string, incorrect_answers: Array<string>}>
     */
async getQuestions(options = {amount: 10, category: '', difficulty: 'medium', token: null }){
    let path = this.main_endpoint;
    let categories = this.categories;

    if (options.category && options.category.length > 0){
        if (!categories[options.category]) throw new TypeError(`Invalid Category: Choose one of the following: ${Object.keys(categories).join(' | ')}`);
        options.category = categories[options.category];
        options.difficulty = options.difficulty.toLowerCase();
        console.log(options.category)
        return new Promise(async (resolve, reject) => {
            let response = await this._request(path, options)
            return resolve({
                data: response.results
            })
        })
    } else {
        return new Promise((async (resolve, reject) => {
            let num = Math.floor(Math.random() * Object.keys(categories).length);
            let category = categories[Object.keys(categories)[num]];
            options.category = category;
            if(options.token){
              query['token'] = options.token;
            };
            let res = await this._request(path, options)

            return resolve({
                data: res.results
            })
        })
        )}
    };



    /**
     *
     * @returns {Promise<string>}
     */
    async create_session_token(){
      return await new Promise(async (resolve, reject) => {
      const url = "https://opentdb.com/api_token.php?command=request";
      const data = await fetch.get(url);
      if(!data.ok){
        reject('error getting session token');
      };
      const token = data.body.token;
      this.session_tokens.push(token);
      resolve(token);
    });
    };

    /**
     *
     * @param {string} token
     * @returns {Promise<string>}
     */
    async refresh_token(token){
      return await new Promise(async (resolve, reject) => {
        if(!this.session_tokens.includes(token)){
          reject('token doesn\'t exist within this API handler')
        } else {
          const url = `https://opentdb.com/api_token.php?command=reset&token=${token}`;
          const data = await fetch.get(url);
          const new_token = data.body.token;
          const index = this.session_tokens.indexOf(token);
          this.session_tokens[index] = new_token;
          resolve(new_token);
        };
      });
    };
};
module.exports = API;
console.log(Object.keys(new API().categories).map((c) => `- ${c}`).join('\n\n'))