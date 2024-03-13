const sql = require('mssql');

// PC
// const pool = new sql.ConnectionPool({
//     database: 'master',
//     port: 60543,
//     server: 'DESKTOP-ACFD4QG',
//     user: 'DESKTOP-ACFD4QG\\maxta',
//     password: '',
//     driver: 'msnodesqlv8',
//     options: {
//         trustedConnection: true
//     }
// });

// Laptop
const pool = new sql.ConnectionPool({
    database: 'master',
    port: 1433,
    server: '10.88.29.193',
    user: 'sa',
    password: 'q8st%6a5!g2mj',
    driver: "{ODBC Driver 17 for SQL Server}",
    authentication: {
        type: "default"
    },
    options: {
        trustServerCertificate: true
    }
});

async function connectToDatabase() {
    try {
        await pool.connect();
        console.log("Connected!");
        return pool;
    } catch (err) {
        console.log("Connection to Database Failed!: " + err);
    }
}

module.exports = connectToDatabase();

// PCS mssql testing server
// var Connection = require('tedious').Connection;

// var config = {
//     server: "10.88.29.193", // or "localhost"
//     options: {
//         trustServerCertificate: true
//     },
//     authentication: {
//         type: "default",
//         options: {
//             userName: "sa",
//             password: "q8st%6a5!g2mj",
//         }
//     }
// };

// var connection = new Connection(config);

// async function connectToDatabase() {
//     // Setup event handler when the connection is established. 
//     // await connection.on('connect', (err) => {
//     //     if (err) {
//     //         console.log('Error: ', err)
//     //     }
//     //     // If no error, then good to go...
//     //     console.log("connected!");
//     //     return connection;
//     // });

//     try {
//         await connection.on('connect', (err)=> {
//             if (err) {
//                 console.error(err);
//             }
//             return connection;
//         });
//     } catch (err) {
//         console.log("Connection Failed!: " + err);
//     }
// }

// Initialize the connection.
// module.exports = connectToDatabase();


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
