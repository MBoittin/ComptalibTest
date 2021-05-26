const express = require('express');
const db = require('./database')
const Company = require('./Models/Company')
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.post('/Company', (req, res) => {
    Company.create({name: req.body.name})
    .then(() => res.send('ok'))
    .catch(((err) => {res.status(400).send({error: 'Bad request'})}))
})

module.exports = app