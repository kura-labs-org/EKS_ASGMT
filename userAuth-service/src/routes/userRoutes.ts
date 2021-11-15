const router = require('express').Router(),
    { currentUser } = require('@chefapp/common'),
    { requireAuth } = require('@chefapp/common'),
    { currentUserController, registerUser, registerChefs, loginUser, logoutUser, updateUser, deleteUser } = require('../controller/userController');

//create user
router.post('api/users/register', registerUser);
router.post('api/users/chefs/register', registerChefs);
//login user
router.post('api/users/login', loginUser);

//get current user
router.get('api/users/me', currentUser, requireAuth, currentUserController);

//updateuser
router.put('api/users/me', updateUser);

//logout user
router.get('api/users/logout', logoutUser);

//delete user
router.delete('api/users/delete', deleteUser);

module.exports = router;