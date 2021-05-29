const API = require('../src/main');

new API().getQuestions({amount: 5, category: 'Sports', difficulty: 'Hard'}).then(console.log)