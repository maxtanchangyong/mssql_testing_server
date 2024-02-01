const operations = require('./operations');
const express = require('express');
const router = express.Router();
const app = express();
const cors = require('cors');

let users = require('./user');
let cors_options = {
    origin: "http://localhost:4200"
};

let port = process.env.PORT || 8090;

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

router.route('/users').get((req, res, next) => {
    operations.getAllUsers().then((data) => {
        res.json(data[0]);
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

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
