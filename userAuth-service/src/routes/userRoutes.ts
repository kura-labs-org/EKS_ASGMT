const router = require('express').Router(),
    { currentUser, registerUser, loginUser, logoutUser, updateUser, deleteUser } = require('../controller/userController');

//create user
router.post('api/users/register', registerUser);
//login user
router.post('api/users/login', loginUser);

//get current user
router.get('api/users/me', currentUser);

//updateuser
router.put('api/users/me', updateUser);

//logout user
router.get('api/users/logout', logoutUser);

//delete user
router.delete('api/users/logout', deleteUser);

module.exports = router;