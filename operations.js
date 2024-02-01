const connectToDatabase = require('./connect');
const sql = require('mssql/msnodesqlv8');

async function testConnection() {
    try {
        const pool = await connectToDatabase;
        return "Connected!";
    } catch (err) {
        console.error("Impossible will appear this error: " + err);
    }
};

async function createUserTable() {
    try {
        const pool = await connectToDatabase;
        await pool
            .request()
            .query(`
                IF OBJECT_ID(N'master.dbo.Users', N'U') IS NULL
                CREATE TABLE Users (
                    ID INT IDENTITY(1,1) PRIMARY KEY,
                    UID NVARCHAR(11) NOT NULL,
                    Name NVARCHAR(255) NOT NULL
                )
            `);
    } catch (err) {
        console.error('Create Table Failed: ' + err);
    }
}

async function getAllUsers() {
    try {
        const pool = await connectToDatabase;
        const result = await pool
            .request()
            .query('SELECT * FROM master.dbo.Users');
        return result.recordsets;
    } catch (err) {
        console.error('Get All Users Failed: ' + err);
    }
}

async function getUsers(uid) {
    try {
        const pool = await connectToDatabase;
        const result = await pool
            .request()
            .input('uid', sql.NVarChar, uid)
            .query('SELECT * FROM master.dbo.Users WHERE UID = @uid');
        return result.recordsets;
    } catch (err) {
        console.error('Find Specific Users Data Failed: ' + err);
    }
}

async function addUsers(user) {
    try {
        const pool = await connectToDatabase;
        await pool
            .request()
            .input('uid', sql.NVarChar, user.Uid)
            .input('name', sql.NVarChar, user.Name)
            .query(`
                INSERT INTO master.dbo.Users (UID, Name)
                VALUES (@uid, @name)
            `)
    } catch (err) {
        console.error('Add data in Users Table Failed: ' + err);
    }
}

async function usersVerification(uid) {
    try {
        const pool = await connectToDatabase;
        const result = await pool
            .request()
            .input('uid', sql.NVarChar, uid)
            .query('SELECT * FROM master.dbo.Users WHERE UID = @uid');
        return result.recordsets;
    } catch (err) {
        console.error('Find Specific Users on Verification Function Failed: ' + err);
    }
}

module.exports = {
    testConnection: testConnection,
    createUserTable: createUserTable,
    getAllUsers: getAllUsers,
    getUsers: getUsers,
    addUsers: addUsers,
    userVerification: usersVerification
}