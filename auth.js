import express from 'express';

const app = express();

const users = [];

app.use(express.json());

function generateToken() {
    let token = '';
    const alphabets = 'abcdefghijklmnopqrstuvwxyz';
    for(let i=0;i<32;i++) {
        const randomChar = alphabets[Math.floor(Math.random() * 26)];
        token+=randomChar;
    }
    return token;
}

app.get('/', function (req, res) {
    res.send({
        message: 'working again'
    })
})

app.post('/signup', function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    // check if username already exists
    const userExists = users.some(user => user.username === username);

    if (!userExists) {
        users.push({ username, password });
        res.send({
            message: 'Signup is successfull'
        })
    } else {
        res.send({
            message: 'Users already exists'
        })
    }
})

app.post('/signin', function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const authenticUser = users.find(user => user.username === username && user.password === password);
    if(authenticUser) {
        const token = generateToken();
        authenticUser.token = token;
        res.send({
            token
        })
        console.log("updated users list", users);
    } else {
        res.send({
            message: 'Invalid username and password'
        })
    }
})

app.get('/me', function(req, res) {
    const token = req.headers.authorization;
    const user = users.find(user => user.token === token)

    if(user) {
        res.send({
            username: user.username,
            password: user.password
        })
    } else {
        res.send({
            message: 'you are not signed in'
        })
    }
})

app.listen(3000);
