import express, { Request, Response } from 'express';
import { validateRequest } from '@chefapp/common';
import { BadRequestError } from '@chefapp/common';
const User = require('../db/model/user');
const { body, validationResult } = require('express-validator');
const { DatabaseConnectionError } = require('@chefapp/common');
const { RequestValidationError } = require('@chefapp/common');
const jwt = require('jsonwebtoken');

exports.registerUser = [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ], async (req: Request, res: Response) => {

    const { email, password } = req.body; 
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Already have an account');
    }

    const user = User.build({ email, password, roles: "user"});
    await user.save();

    // Generate JWT
    const userJwt= await user.generateAuthToken();

    // Store it on session object
    req.session = {
      jwt: userJwt
    };

    res.status(201).send(user);

};
exports.registerChefs = [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ], async (req: Request, res: Response) => {

    const { email, password } = req.body; 
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Already have an account');
    }

    const user = User.build({ email, password, roles: "chef"});
    await user.save();

    // Generate JWT
    const userJwt= await user.generateAuthToken();

    // Store it on session object
    req.session = {
      jwt: userJwt
    };

    res.status(201).send(user);

};


exports.loginUser = [
    body('email')
      .isEmail()
      .withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findByCredentials(email, password);
    if (!existingUser) {
      throw new BadRequestError('Invalid Email or Password');
    }

    const userJwt = await existingUser.generateAuthToken();
    // Store it on session object
    req.session = {
      jwt: userJwt
    };

    res.status(200).send(existingUser);

};


exports.currentUserController = async (req: Request, res: Response) => {
    res.send({ currentUser: req.currentUser || null });
};


exports.logoutUser = async (req: Request, res: Response) => {
  req.session = null;
  res.send({});
};
