const router = require('express').Router(),
    { createMeal, getMeal, getMeals, updateMeal, deleteMeal } = require('../controller/mealController'),
    { requireAuth } = require('@chefapp/common');

//create meal
router.post('api/meals', requireAuth, createMeal);

//get a meal
router.get('api/meals/:id', requireAuth, getMeal);

//get all meals
router.get('api/meals', requireAuth, getMeals);

//get current user
router.put('api/meals/:id', requireAuth, updateMeal);

router.delete('api/meals/:id', requireAuth, deleteMeal);


export = router;