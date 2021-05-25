const db = require("../database")
const Company = require("../Models/Company")
const User = require("../Models/User")
const assert = require('assert');

describe('Database', function() {
  describe('Connection', function() {
    it('should connect and authenticate with the database', function() {
        return db.authenticate()
        .then((res) => {assert.ok(true);}, 
        (err) => {assert.ok(false, err)})
    });
  });
  describe('Company model', function() {
    it('should sync company model', function() {
      return Company.sync({})
      .then((res) => {assert.ok(true);},
      (err) => {assert.ok(false, err)})
    })
    it('should create default company', function() {
      return Company.create({name: "Default"})
      .then((res) => {assert.ok(true);},
      (err) => {assert.ok(false, err)})
    })
    it('should get and delete default company', async function() {
      let defaultCompanies = await Company.findAll({where: {name: "Default"}})
      await defaultCompanies[0].destroy()
      assert.ok(true);
    })
  });
  describe('User model', function() {
    it('should sync user model', function() {
      return User.sync({})
      .then((res) => {assert.ok(true);},
      (err) => {assert.ok(false, err)})
    })
    it('should create default user', function() {
      return User.create({name: "Default"})
      .then((res) => {assert.ok(true);},
      (err) => {assert.ok(false, err)})
    })
    it('should get and delete default user', async function() {
      let defaultUsers = await User.findAll({where: {name: "Default"}})
      await defaultUsers[0].destroy()
      assert.ok(true);
    })
  });
});