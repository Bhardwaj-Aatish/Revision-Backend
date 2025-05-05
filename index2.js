import express from 'express';

const app = express();
app.use(express.json());

app.get('/', function(req, res) {
    res.send({
        message: 'This is the new home page'
    })
})

app.post('/add', function(req, res) {
    const a = req.body.a;
    const b = req.body.b;
    const result = a+ b;
    res.send({
        ans: result
    })
})

app.post('/subtract', function(req, res) {
    const a = req.body.a;
    const b = req.body.b;
    res.send({
        ans: a-b
    })
})

app.post('/divide', function(req, res) {
    const a = req.body.a;
    const b = req.body.b;
    res.send({
        ans: a/b
    })
})

app.post('/multiply', function(req, res) {
    const a = req.body.a;
    const b = req.body.b;
    res.send({
        ans: a*b
    })
})
app.listen(3000);
