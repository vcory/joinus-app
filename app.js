const mysql = require("mysql");
const {promisify} = require('util');
// const faker = require('faker');

const connection = mysql.createConnection ({
    host: "localhost",
    user: "root",
    password: "password",
    database: "joinus"

});


//promisify the connection
const promisifiedQuery = promisify(connection.query).bind(connection);

const runQuery = async () => {
    try{
        //wait for the promise to be handled before trying to the data
        let data = await promisifiedQuery('SELECT * FROM users');
        return(data);
    } catch (error) {
        console.log(error.sqlMessage);
    }
    connection.end();
    
};

// const bulkAdd = () => {
//     let people = [];
//     for (i = 0; i < 500; i++) {
//         people.push([faker.internet.email(), faker.date.past()])
//     }
//     return people;
// };

const addEmail = async (email) => {
    try {
        //wait for the promise to be handled before trying to log the data
        const queryStringAdd = `INSERT INTO users(email) VALUES ${email}')`;
        let data = await promisifiedQuery(queryStringAdd);
        return(data);
    } catch (error) {
        console.log(error.sqlMessage);
    }
};
// addEmail();

// const person = {
//     email: faker.internet.email()
// };

module.exports = {
    runQuery,
    addEmail
};