const connectToDatabase = require('./connect');
const sql = require('mssql/msnodesqlv8');

// let Request = require('tedious').Request;

async function testConnection() {
    try {
        const pool = await connectToDatabase;
        return "Connected!";
    } catch (err) {
        console.error("Impossible will appear this error: " + err);
    }
};

async function checkTableExist() {
    try {
        const pool = await connectToDatabase;
        const result = await pool
            .request()
            .query(`
                SELECT CAST(COUNT(*) AS BIT)
                FROM INFORMATION_SCHEMA.TABLES
                WHERE TABLE_SCHEMA = 'dbo'
                AND TABLE_NAME = 'Users'
            `);
        return result.recordsets;
    } catch (err) {
        console.error('Check User Table Exist Function Failed: ' + err);
    }
}

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
        return "Done Table Creation!";
    } catch (err) {
        console.error('Create Table Failed: ' + err);
    }
}

async function getAllUsers() {
    try {
        const pool = await connectToDatabase;
        const result = await pool
            .request()
            .query('SELECT Uid, Name FROM master.dbo.Users');
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
        return 'Successfully added a user!';
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

async function updateUser(updateInfo) {
    try {
        const pool = await connectToDatabase;
        await pool
            .request()
            .input('uid', sql.NVarChar, updateInfo.uid)
            .input('oldName', sql.NVarChar, updateInfo.oldName)
            .input('newName', sql.NVarChar, updateInfo.newName)
            .query(`
                UPDATE master.dbo.Users
                SET Name=@newName
                WHERE UID=@uid AND Name=@oldName
            `);
        return [`Successfully update user ${updateInfo.uid}`]
    } catch (err) {
        console.error('Update User Information Failed: ' + err);
    }
}

async function deleteUser(uid) {
    try {
        const pool = await connectToDatabase;
        await pool
            .request()
            .input('uid', sql.NVarChar, uid)
            .query('DELETE FROM master.dbo.Users WHERE UID=@uid');
        return `Succesfully Deleted User ${uid}`;
    } catch (err) {
        console.error('Delete User Failed: ' + err);
    }
}

module.exports = {
    testConnection: testConnection,
    checkTableExist: checkTableExist,
    createUserTable: createUserTable,
    getAllUsers: getAllUsers,
    getUsers: getUsers,
    addUsers: addUsers,
    userVerification: usersVerification,
    updateUser: updateUser,
    deleteUser: deleteUser
}