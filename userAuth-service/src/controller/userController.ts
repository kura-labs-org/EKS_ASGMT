import express, { Request, Response } from 'express';
import { validateRequest } from '../middlewares/validate-request';
import { BadRequestError } from '../errors/bad-request';
const User = require('../db/model/user'),
{ body, validationResult } = require('express-validator'),
{ DatabaseConnectionError } = require('../errors/db-conn-error'),
{ RequestValidationError } = require('../errors/requestValidator'),
  jwt = require('jsonwebtoken');

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

    const user = User.build({ email, password, role: "user"});
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
