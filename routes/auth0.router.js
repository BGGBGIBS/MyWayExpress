const auth0Controller = require("../controllers/auth0.controller");

const auth0Router = require("express").Router();

auth0Router.route('/register')
    .post( auth0Controller.register)

auth0Router.route('/login')
    .post( auth0Controller.login)

auth0Router.route('/logout')
    .post( auth0Controller.logout)

auth0Router.route('/token')
    .post( auth0Controller.getToken)

module.exports = auth0Router;