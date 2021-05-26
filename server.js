const express = require('express');
const db = require('./database')
const Company = require('./Models/Company')
const User = require('./Models/User')
const CompanyToUser = require('./Models/CompanyToUser')
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.post('/Company', (req, res) => {
    Company.create({name: req.body.name})
    .then(() => res.send('ok'))
    .catch((err) => {res.status(400).send({error: 'Bad request'})})
})

app.get('/Company', (req, res) => {
    Company.findOne({name: req.body.name})
    .then((company) => {
        CompanyToUser.findAll({where : {companyId: company.id}})
        .then((users) => {
            let resCompany = company.toJSON();
            resCompany.users = users;
            res.send(resCompany)
        })
    })
    .catch((err) => res.status(404).send({error: 'Not found'}))
})

app.post('/User', (req, res) => {
    User.create({name: req.body.name})
    .then(() => res.send('ok'))
    .catch((err) => {res.status(400).send({error: 'Bad request'})})
})

app.get('/User', (req, res) => {
    User.findOne({name: req.body.name})
    .then((user) => {
        CompanyToUser.findAll({where : {userId: user.id}})
        .then((companies) => {
            let resUser = user.toJSON()
            resUser.companies = companies
            res.send(resUser)
        })
    })
    .catch((err) => res.status(404).send({error: 'Not found'}))
})

module.exports = app