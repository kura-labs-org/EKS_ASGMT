const router = require('express').Router(),
    { currentUser } = require('@chefapp/common'),
    { requireAuth } = require('@chefapp/common'),
    { currentUserController, registerUser, registerChefs, loginUser, logoutUser, updateUser, deleteUser } = require('../controller/userController');

//create user
router.post('/', registerUser);
router.post('/chefs', registerChefs);
//login user
router.post('/login', loginUser);

//get current user
router.get('/me', currentUser, requireAuth, currentUserController);

//updateuser
//router.put('api/users/me', updateUser);

//logout user
//router.get('api/users/logout', logoutUser);

//delete user
//router.delete('api/users/delete', deleteUser);

export = router;