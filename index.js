import express from 'express'

const app = express();

let totalRequestSent = 0;

function specialMiddleWare(req, res, next) {
    console.log("Only for multiply");
    console.log('Request is', req);
    res.send({
        message: 'No multiplication is allowed'
    })
}

app.use(function(req, res, next) {
    totalRequestSent+= 1;
    console.log("Total request sent is", totalRequestSent);
    next();
})

app.use(function (req, res, next) {
    const method = req.method;
    const url = req.url;
    const date = new Date();
    console.log(`Method is ${method}, url is ${url} and date is ${date}`);
    next();
})

app.get('/', function(req, res) {
    res.send('this is the home page')
})

app.get('/totalRequest', function(req, res) {
    res.send({
        message: `Total request sent till now is ${totalRequestSent}`
    })
})

app.get('/add', function(req, res) {
    const a = req.query.a;
    const b = req.query.b;
    const response = parseInt(a) + parseInt(b);
    res.send(`The is sum is ${response}`);
})

app.get('/subtract', function(req, res) {
    const a = req.query.a;
    const b = req.query.b;
    const result = parseInt(a) - parseInt(b);
    res.send(`The difference is ${result}`);
})

app.get('/multiply', specialMiddleWare, function(req, res) {
    const a = req.query.a;
    const b = req.query.b;
    const result = a * b;
    console.log(`Your name is ${req.name}`);
    res.send(`The multiplication is ${result}`);
})

app.get('/divide', function(req, res) {
    const a = req.query.a;
    const b = req.query.b;
    const result = a/b;
    res.send(`The Division is ${result}`);
})
app.listen(3001);
