import express, { Request, Response } from 'express';
import { NotFoundError } from '@chefapp/common';
const Meal = require('../db/model/meal');


exports.createMeal = async (req: Request, res: Response) => {
    const meal = Meal.build({
        ...req.body,
        userId: req.currentUser!.id,
    });
    await meal.save();

    res.status(201).send(meal);
}

exports.getMeal = async (req: Request, res: Response) => {
    const meal = await Meal.findById(req.params.id);

    if (!meal) {
        throw new NotFoundError();
    }
    
    res.send(meal);
}

exports.getMeals = async (req: Request, res: Response) => {
    const meals = await Meal.find({});

    if (!meals) {
        throw new NotFoundError();
    }

    res.send(meals)
}

exports.updateMeal = async (req: Request, res: Response) => {
    const meal = await Meal.findByIdAndUpdate({
        ...req.body,
        _id: req.params.id
      });

    if (!meal) {
        throw new NotFoundError();
    }

    res.send(meal)
    
}

exports.deleteMeal = async (req: Request, res: Response) => {
    const meal = await Meal.findOneAndDelete({
        _id: req.params.id
    });

    if (!meal) return res.status(404).json({ error: 'Meal not found' });
    res.json({ message: 'Meal has been deleted' });
}
