# TDB-API


### About

A wrapper for [OpenTDB API](https://opentdb.com/) made in Javascript

Created By: ItsHisoka17, SkellyM386

### Simply Usage
```js
const TDB_API = require('tdb-api');

const trivia = new TDB_API();

trivia.getQuestions({amount: 10, category: 'Sports', difficulty: 'medium'})
.then(res => {
    console.log(res)
});
```

### Handling Sessions
```js
const TDB_API = require('tdb-api');

const trivia = new TDB_API();


async function start(){
    let token = await trivia.create_session_token(); //Creates a token
    trivia.getQuestions({amount: 10, category: 'Sports', difficulty: 'medium', token: token})
    .then(res => {
        console.log(res) //Returns: {category: string, type: string, difficulty: string, question: string, correct_answer: string, incorrect_answers: Array<string>}
    })
    .catch(async () => {
        let newToken = await trivia.refresh_token(token); //Requests a new token and invalidates the previous one
        trivia.getQuestions({amount: 10, category: 'Sports', difficulty: 'medium', token: newToken})
        .then(res => {
            console.log(res)
        })
    })

}
start()
```


### Categories:
- General Knowledge

- Books

- Films

- Music

- Musical & Theatre

- TV

- Video Games

- Board Games

- Science & Nature

- Computers

- Mathematics

- Mythology

- Sports

- Geography

- History

- Politics

- Art

- Celebrities

- Animals

- Vehicles

- Comics

- Gadgets

- Anime & Manga

- Cartoons & Animations

### Contact

**[Discord](https://discord.gg/WhnmkwgtGb)** | **[Github](https://github.com/ItsHisoka17/TDB-API)**