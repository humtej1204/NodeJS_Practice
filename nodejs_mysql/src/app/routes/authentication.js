const express = require('express');
const router = express.Router();

const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../../lib/auth');

router.get('/signup', isNotLoggedIn, (req, res) => {
	res.render('auth/signup');
});

router.post('/signup', passport.authenticate('local.signup', {
		successRedirect: '/profile',
		failureRedirect: '/signup'
}));

router.get('/signin', isNotLoggedIn, (req, res) => {
	res.render('auth/signin');
});

router.post('/signin', (req, res, next) => {
	passport.authenticate('local.signin', {
		successRedirect: '/profile',
		failureRedirect: '/signin'
	}) (req, res, next);
});

router.get('/profile', isLoggedIn, (req, res) => {
	res.render('profile');
});

router.get('/logout', (req, res) => {
	req.logOut(function(err) {
		if (err) { return next(err);
		}
	});
	res.redirect('/signin');
});

module.exports = router;
