const operations = require('./operations');
const express = require('express');
const router = express.Router();
const app = express();
const cors = require('cors');

let users = require('./user');
// for debian vm use
let cors_options = {
    origin: "http://10.88.29.111:8000"
};

// for local use
// let cors_options = {
//     origin: "http://localhost:4200"
// };

let port = process.env.PORT || 8080;

app.use(cors(cors_options));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api', router);


// middleware
router.use((req, res, next) => {
    next();
});

// ---------- GET ----------
router.route('/test').get((req, res, next) => {
    operations.testConnection().then((data) => {
        res.json(data);
    });
});

router.route('/users/checkTable').get((req, res, next) => {
    operations.checkTableExist().then((data) => {
        // this is a boolean type return
        res.json(data[0][0][""]);
    });
});

router.route('/users').get((req, res, next) => {
    operations.getAllUsers().then((data) => {
        res.json(data[0]);
    });
});

router.route('/users/createTable').get((req, res, next) => {
    operations.createUserTable().then((data) => {
        res.json(data);
    });
});

router.route('/users/:uid').get((req, res, next) => {
    operations.getUsers(req.params.uid).then((data) => {
        res.json(data[0]);
    });
});

router.route('/users/verification/:uid').get((req, res, next) => {
    operations.userVerification(req.params.uid).then((data) => {
        data[0].length ? res.status(201).json('Verified user') : res.status(201).json('Unverified user');
    });
});


// ---------- POST ----------
router.route('/users').post((req, res, next) => {
    let user = { ...req.body };
    operations.addUsers(user).then((data) => {
        res.status(201).json(data);
    });
});

router.route('/users/:uid').post((req, res, next) => {
    let user = { ...req.body };
    operations.addUsers(user).then((data) => {
        res.status(201).json(data);
    });
});

// ---------- PUT ----------
router.route('/users/updateUser').put((req, res, next) => {
    let updateInfo = { ...req.body };
    operations.updateUser(updateInfo).then((data) => {
        res.status(201).json(data);
    });
});

// ---------- DELETE ----------
router.route('/users/:uid').delete((req, res, next) => {
    operations.deleteUser(req.params.uid).then((data) => {
        res.status(201).json(data);
    });
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
