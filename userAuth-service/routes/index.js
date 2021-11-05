const router = require('express').Router(),
  { createUser, loginUser, getCurrentUser,
    updateCurrentUser,
    logoutUser,
    logoutAllDevices,
    deleteUser } = require('../controller/index');

const { currentUser } = require('../middleware/currentUser')
const { authRequired } = require('../middleware/authRequired')

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/me', currentUser, authRequired, getCurrentUser);
router.patch('/me', currentUser, authRequired, updateCurrentUser);
//router.post('/avatar', avatarUser);
router.post('/logout', currentUser, authRequired, logoutUser);
router.post('/logoutall', logoutAllDevices);
router.delete('/:id', currentUser, authRequired, deleteUser);


module.exports = router;