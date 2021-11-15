const router = require('express').Router(),
    { getStore, getMyStore, getAllStores, createStore, getStoreByZip, searchStores, updateStore } = require('../controller/storeController'),
    { requireAuth, currentUser } = require('@chefapp/common');

//create user
router.post('api/stores', requireAuth, currentUser, createStore);

//different ways to get the stores
router.get('api/stores/mystore', requireAuth, currentUser, getMyStore);
router.get('api/stores/:id', requireAuth, getStore);
router.get('api/stores/radius/:zipcode/:distance/', requireAuth, getStoreByZip);
router.get('api/stores/search', requireAuth, searchStores);
router.get('api/stores', requireAuth, getAllStores);

//get current user
router.put('api/stores/mystore', requireAuth, currentUser, updateStore);

//logout user
//router.delete('api/users/logout', deleteStore);


export = router;