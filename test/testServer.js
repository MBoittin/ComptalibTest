const app = require("../server")
const axios = require('axios')
const assert = require('assert');
let server

let port = 3000
let serverUrl = 'http://localhost:' + port
let defaultName = 'Default'
let newName = 'Default2'

before((done) => {
    server = app.listen(port, done);
})

describe('Server', function() {
    describe('Company CRUD', function() {
        it('should create a Default company', function() {
            return axios.post(serverUrl + '/Company', {name : defaultName})
            .then((res) => {assert.ok(true)},
            (err) => {assert.ok(false, err)})
        })
        it('should get Default company', function() {
            return axios.get(serverUrl + '/Company', {params : {name : defaultName}})
            .then((res) => {
                if (res.data.name == defaultName)
                    assert.ok(true)
                else
                    assert.ok(false, "Company does not match default name")
            },
            (err) => {assert.ok(false, err)})
        })
        it('should update company name to Default2', async function(){
            let user = await axios.get(serverUrl + '/Company', {params : {name : defaultName}})
            await axios.put(serverUrl + '/EditCompany', {id: user.data.id, name: newName})
            assert.ok(true)
        })
    })
    describe('User CRUD', function() {
        it('should create a Default user', function() {
            return axios.post(serverUrl + '/User', {name : defaultName})
            .then((res) => {assert.ok(true)},
            (err) => {assert.ok(false, err)})
        })
        it('should get Default user', function() {
            return axios.get(serverUrl + '/User', {params : {name : defaultName}})
            .then((res) => {
                if (res.data.name == defaultName)
                    assert.ok(true)
                else
                    assert.ok(false, "User does not match default name")
            },
            (err) => {assert.ok(false, err)})
        })
        it('should update user name to Default2', async function(){
            let user = await axios.get(serverUrl + '/User', {params : {name : defaultName}})
            await axios.put(serverUrl + '/EditUser', {id: user.data.id, name: newName})
            assert.ok(true)
        })
    })
    describe('Link Company to User', function() {
        it('should create a link between Default user and Default company', async function(){
            let company = (await axios.get(serverUrl + '/Company', {params : {name : newName}})).data
            let user = (await axios.get(serverUrl + '/User', {params : {name : newName}})).data
            await axios.post(serverUrl + '/LinkCompanyToUser', {companyId: company.id, userId: user.id})
        })
        it('should delete a link between Default user and Default company', async function(){
            let company = (await axios.get(serverUrl + '/Company', {params : {name : newName}})).data
            let user = (await axios.get(serverUrl + '/User', {params : {name : newName}})).data
            await axios.delete(serverUrl + '/LinkCompanyToUser', {data : {companyId: company.id, userId: user.id}})
        })
    })
    describe('Cleaning database', function() {
        it('should delete Default company', function() {
            return axios.delete(serverUrl + '/Company', {data: {name : newName}})
            .then((res) => {assert.ok(true)},
            (err) => {assert.ok(false, err)})
        })
        it('should delete Default user', function() {
            return axios.delete(serverUrl + '/User', {data: {name : newName}})
            .then((res) => {assert.ok(true)},
            (err) => {assert.ok(false, err)})
        })
    })
})

after((done) => {
    server.close(done)
})