const sql = require('mssql/msnodesqlv8');

const pool = new sql.ConnectionPool({
    database: 'sales',
    port: 60543,
    server: 'DESKTOP-ACFD4QG',
    user: 'DESKTOP-ACFD4QG\\maxta',
    password: '',
    driver: 'msnodesqlv8',
    options: {
        trustedConnection: true
    }
});

async function connectToDatabase() {
    try {
        await pool.connect();
        return pool;
    } catch (err) {
        console.log("Connection to Database Failed!: " + err);
    }
}

module.exports = connectToDatabase();