// RESTful configuration
const express = require('express');
const cors = require('cors');

const app = express();

var cors_options = {
    origin: "http://localhost:8081"
};

app.use(cors(cors_options));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

const connectToDatabase = require('./connect');

// create table user
app.get("/createTable", async (req, res, next) => {
    const pool = await connectToDatabase;

    try {
        await pool.request().query(`
            IF OBJECT_ID(N'sales.Users', N'U') IS NULL
            CREATE TABLE Users (
                ID INT IDENTITY(1,1) PRIMARY KEY,
                UID NVARCHAR(11) NOT NULL,
                Name NVARCHAR(255) NOT NULL
            )
        `)
        console.log('Table created: Users');
    } catch (err) {
        console.log(err);
    }
    res.json({message:'Done creating table Users'});
});


// insert data into user table
app.get("/insertUserData", async (req, res, next) => {
    const pool = await connectToDatabase;

    try {
        await pool.request().query(`
            INSERT INTO Users
                (UID, Name)
            VALUES
                ('00001', 'maxtan'),
                ('00002', 'mslee'),
                ('00003', 'dummy')
        `)
    } catch (err) {
        console.error("Error inserting data: ", err);
    }
    res.json({message:'Done inserting data into table Users'});
});

// get data from table
app.get("/getUserData", async (req, res, next) => {
    const pool = await connectToDatabase;

    try {
        const result = await pool
            .request()
            .query(`SELECT * FROM sales.dbo.Users`)
        result.recordset.forEach((row) => {
            console.log(`UID: ${row.UID}, Name: ${row.Name}`);
        });
    } catch (err) {
        console.log(err);
    }
    res.json({message:'Done getting data from table Users'});
});

// verification from table
app.get("/verification/:uid", async (req, res, next) => {
    const verification = req.params.uid;
    const pool = await connectToDatabase;

    var verification_result = false;

    try {
        const result = await pool
            .request()
            .query(`SELECT * FROM sales.dbo.Users`)
        result.recordset.forEach((row) => {
            if (row.UID == verification) verification_result = true;
        });

        if (verification_result) {
            res.send("verification completed!");
        }
        else {
            res.send("verification failed!");
        }
    } catch (err) {
        console.log(err)
    }
});

// close connection
app.get("/close", async (req, res, next) => {
    const pool = await connectToDatabase;

    try {
        pool.close();
    } catch (err) {
        console.log("Cannot close connection!?: " + err);
    }
});

// simple route
app.get("/", (req, res, next) => {
    res.json({message:"Hello World!"});
});

// test connection

// set PORT, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});