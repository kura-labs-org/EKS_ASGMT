import express, { Request, Response } from 'express';
const User = require('../db/model/user'),
{ body, validationResult } = require('express-validator'),
  jwt = require('jsonwebtoken');

exports.registerUser = async (req: Request, res: Response) => {
    
    try{
    }catch(err){

    }

};


exports.loginUser = async (req: Request, res: Response) => {
    
    try{
    }catch(err){

    }

};


exports.currentUser = async (req: Request, res: Response) => {
    try{
        res.send('Hello')
    }catch(err){

    }

};


exports.logoutUser = async (req: Request, res: Response) => {
    try{
    }catch(err){

    }

};

exports.updateUser = async (req: Request, res: Response) => {
    try{
    }catch(err){

    }

};


exports.deleteUser = async (req: Request, res: Response) => {
    try{
    }catch(err){

    }

};
