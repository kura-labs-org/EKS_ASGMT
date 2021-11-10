const router = require('express').Router(),
    { getCurrentStore, getAllStores, createStore, updateStore, deleteStore } = require('../controller/storeController');

//create user
router.post('api/users/register', createStore);
//login user
router.get('api/users/login', getCurrentStore);
router.get('api/users/login', getAllStores);

//get current user
router.put('api/users/me', updateStore);

//logout user
router.delete('api/users/logout', deleteStore);


module.exports = router;