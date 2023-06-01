const express = require("express");
const router =express.Router();
const AuthControllers = require('../controllers/AuthControllers')
const checkAuth = require("../helpers/auth").checkAuth;

//controllers

router.get('/register', AuthControllers.register);
router.post('/register', AuthControllers.registerPost);
router.get('/logout', AuthControllers.logout);
router.get('/login', AuthControllers.login)
router.post('/login', AuthControllers.loginPost)
router.get('/edit/:id', checkAuth, AuthControllers.edit)
router.post('/edit', checkAuth, AuthControllers.updatePost)

module.exports = router