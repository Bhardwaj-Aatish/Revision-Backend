import express from 'express';
import jwt from 'jsonwebtoken'

const SECRET = 'thisisasecretcode'

const app = express();

app.use(express.json());
const users= [];

app.get('/', function (req, res) {
    res.send({
        message: 'Working now'
    })
})

app.post('/signup', function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const isUserExist = users.some(user => user.username === username);
    if(isUserExist) {
        res.send({
            message: 'User already exists'
        })
    } else {
        users.push({username, password});
        res.send({
            message: 'Signup is successfull'
        })
        console.log("users list", users)
    }
})

app.post('/signin', function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const authenticUser = users.find(user => user.username === username && user.password === password);

    if(authenticUser) {
        const token = jwt.sign({
            username
        }, SECRET);
        res.send({
            token
        })
    } else {
        res.send({
            message: 'Incorrect username or password'
        })
    }

})

app.get('/me', function(req, res) {
    const token = req.headers.token;
    const userDetails = jwt.verify(token, SECRET);
    // without the try catch block jwt.verify will throw an internal server error if token is incorrect
    const user = users.find(user => user.username === userDetails.username);

    if(user) {
        res.send({
            username: user.username,
            password: user.password
        })
    } else {
        res.send({
            message: 'You are not signed in'
        })
    }
})

app.listen(3000);