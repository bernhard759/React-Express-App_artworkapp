const { Router } = require('express');
const { check } = require('express-validator');
const { validationResult } = require('express-validator');
const { login } = require('../controllers/auth');

const router = Router();

// Validation function middleware
const validateInput = ( req, res, next ) => { 
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json(errors);
    }
    next();
}

// POST
router.post('/login',[
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateInput
], login);

module.exports = router;