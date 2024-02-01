const sql = require('mssql/msnodesqlv8');

// PC
const pool = new sql.ConnectionPool({
    database: 'master',
    port: 60543,
    server: 'DESKTOP-ACFD4QG',
    user: 'DESKTOP-ACFD4QG\\maxta',
    password: '',
    driver: 'msnodesqlv8',
    options: {
        trustedConnection: true
    }
});

// Laptop
// const pool = new sql.ConnectionPool({
//     database: 'master',
//     port: 60543,
//     server: 'DESKTOP-1NI2IDN',
//     user: 'DESKTOP-1NI2IDN\\Forge-15 1650',
//     password: '',
//     driver: 'msnodesqlv8',
//     options: {
//         trustedConnection: true
//     }
// });

async function connectToDatabase() {
    try {
        await pool.connect();
        return pool;
    } catch (err) {
        console.log("Connection to Database Failed!: " + err);
    }
}

module.exports = connectToDatabase();


// const { Sequelize } = require('sequelize');
// require('dotenv').config();

// const sequelize = new Sequelize(
//     process.env.DB,
//     process.env.USER,
//     process.env.PASSWORD, {
//         host: process.env.HOST,
//         port: process.env.SQL_PORT,
//         dialect: 'mssql',
//         option: {
//             encrypt: false,
//             enableArithAbort: false
//         },
//         dialectOptions: {
//             instanceName: 'MSSQLSERVER'
//         }
//     }
// );

// async function connectToDatabase() {
//     try {
//         await sequelize.authenticate();
//         console.log('Connected!');
//     } catch (err) {
//         console.error('Connection Error! : ' + err);
//     }
// }

// connectToDatabase();