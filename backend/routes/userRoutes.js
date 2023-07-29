const router = require('express').Router();
const { googleOauthHandler } = require('../controllers/authController');
const usersController = require('../controllers/usersController');

router.get('/', usersController.index, usersController.indexView);
router.get('/new', usersController.new);
router.post(
	'/create',
	usersController.validate,
	usersController.create,
	usersController.redirectView
);
router.get('/login', usersController.login);
router.post('/login', usersController.authenticate);
router.get('/logout', usersController.logout, usersController.redirectView);
router.get('/:id/edit', usersController.edit);
router.put('/:id/update', usersController.update, usersController.redirectView);
router.get('/:id', usersController.show, usersController.showView);
router.delete(
	'/:id/delete',
	usersController.delete,
	usersController.redirectView
);
router.get('/oauth/google', googleOauthHandler);

module.exports = router;
