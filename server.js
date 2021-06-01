const express = require('express');
const db = require('./database')
const { Op } = require("sequelize");
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
    if (req.query.id == undefined)
        req.query.id = null;
    if (req.query.name == undefined)
        req.query.name = null;
    Company.findOne({where: {[Op.or]: [{name: req.query.name}, {id: req.query.id}]}})
    .then((company) => {
        CompanyToUser.findAll({where : {companyId: company.id}})
        .then((users) => {
            let resCompany = company.toJSON();
            let resUsers = []
            users.forEach((user) => {
                resUsers.push(user.userId)
            })
            resCompany.users = resUsers
            res.send(resCompany)
        })
    })
    .catch((err) => res.status(404).send({error: 'Not found'}))
})

app.get('/GetAllCompanies', (req, res) => {
    Company.findAll({raw : true})
    .then((companies) => {
        res.send(companies);
    })
    .catch((err) => res.status(404).send({error: 'Not found'}))
})

app.delete('/Company', (req, res) => {
    if (req.body.id == undefined)
        req.body.id = null;
    if (req.body.name == undefined)
        req.body.name = null;
    Company.findOne({where: {[Op.or]: [{name: req.body.name}, {id: req.body.id}]}})
    .then((company) => {
        CompanyToUser.destroy({where : {companyId: company.id}})
        company.destroy();
        res.send('ok')
    })
    .catch((err) => res.status(400).send({error: 'Bad request'}))
})

app.put('/EditCompany', (req, res) => {
    Company.findOne({where: {id : req.body.id}})
    .then((company) => {
        company.update(req.body)
        .then(res.send('ok'))
    })
    .catch((err) => res.status(400).send({error: 'Bad request'}))
})

app.post('/User', (req, res) => {
    User.create({name: req.body.name})
    .then(() => res.send('ok'))
    .catch((err) => {res.status(400).send({error: 'Bad request'})})
})

app.get('/User', (req, res) => {
    if (req.query.id == undefined)
        req.query.id = null;
    if (req.query.name == undefined)
        req.query.name = null;
    User.findOne({where: {[Op.or]: [{name: req.query.name}, {id: req.query.id}]}})
    .then((user) => {
        CompanyToUser.findAll({where : {userId: user.id}})
        .then((companies) => {
            let resUser = user.toJSON()
            let resCompanies = []
            companies.forEach((company) => {
                resCompanies.push(company.companyId)
            })
            resUser.companies = resCompanies
            res.send(resUser)
        })
    })
    .catch((err) => res.status(404).send({error: 'Not found'}))
})

app.get('/GetAllUsers', (req, res) => {
    User.findAll({raw : true})
    .then((users) => {
        res.send(users);
    })
    .catch((err) => res.status(404).send({error: 'Not found'}))
})

app.delete('/User', (req, res) => {
    if (req.body.id == undefined)
        req.body.id = null;
    if (req.body.name == undefined)
        req.body.name = null;
    User.findOne({where: {[Op.or]: [{name: req.body.name}, {id: req.body.id}]}})
    .then((user) => {
        CompanyToUser.destroy({where : {userId: user.id}})
        user.destroy();
        res.send('ok')
    })
    .catch((err) => res.status(400).send({error: 'Bad request'}))
})

app.put('/EditUser', (req, res) => {
    User.findOne({where: {id : req.body.id}})
    .then((user) => {
        user.update(req.body)
        .then(res.send('ok'))
    })
    .catch((err) => res.status(400).send({error: 'Bad request'}))
})

app.post('/LinkCompanyToUser', (req, res) => {
    CompanyToUser.create({companyId: req.body.companyId, userId: req.body.userId})
    .then(() => {res.send('ok')})
    .catch((err) => {res.status(400).send({error: 'Bad request'})})
})

app.delete('/LinkCompanyToUser', (req, res) => {
    CompanyToUser.destroy({where: {companyId: req.body.companyId, userId: req.body.userId}})
    .then(() => {res.send('ok')})
    .catch((err) => {res.status(400).send({error: 'Bad request'})})
})

module.exports = app