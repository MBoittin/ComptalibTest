const app = require("../server")
const axios = require('axios')
const assert = require('assert');
let server

let port = 3000
let serverUrl = 'http://localhost:' + port

before((done) => {
    server = app.listen(port, done);
})

describe('Server', function() {
    describe('Company CRUD', function() {
        it('should create a Default company', function() {
            return axios.post(serverUrl + '/Company', {name : 'Default'})
            .then((res) => {assert.ok(true)},
            (err) => {assert.ok(false, err)})
        })
    })
})

after((done) => {
    server.close(done)
})