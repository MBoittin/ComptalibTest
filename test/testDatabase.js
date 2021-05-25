const db = require("../database")
const Company = require("../Models/Company")
const assert = require('assert');

describe('Database', function() {
  describe('Connection', function() {
    it('should connect and authenticate with the database', function() {
        return db.authenticate()
        .then((err) => {assert.ok(true);}, 
        (err) => {assert.ok(false, err)})
    });
  });
  describe('Company model', function() {
    it('should sync company model', function() {
      return Company.sync({})
      .then((err) => {assert.ok(true);}),
      (err) => {assert.ok(false, err)}
    })
  })
});