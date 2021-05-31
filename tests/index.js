const TDB_API = require('tdb-api');

const trivia = new TDB_API();

//Basic Usage:

trivia.getQuestions({amount: 10, category: 'Sports', difficulty: 'medium'})
.then(res => {
    console.log(res)
});

//Usage with sessions:

async function start(){
    let token = await trivia.create_session_token();
    trivia.getQuestions({amount: 10, category: 'Sports', difficulty: 'medium', token: token})
    .then(res => {
        console.log(res)
    })
    .catch(async () => {
        let newToken = await trivia.refresh_token(token);
        trivia.getQuestions({amount: 10, category: 'Sports', difficulty: 'medium', token: newToken})
        .then(res => {
            console.log(res)
        })
    })

}
start()