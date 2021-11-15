import express, { Request, Response } from 'express';
const Store = require('../db/model/store');
const querystring = require('querystring');;
import { geocoder } from '../middleware/index';
import { NotFoundError } from '@chefapp/common';



exports.getMyStore = async (req: Request, res: Response) => {

    const currentUserId = req.currentUser!.id
    const store = await Store.findOne({ userId: currentUserId })
    
    if (!store) {
        throw new NotFoundError();
      }
    res.send(store);

};

exports.getStore = async (req: Request, res: Response) => {
    const store = await Store.findById(req.params.id);

    if (!store) {
        throw new NotFoundError();
      }
    
    res.send(store);
};

exports.getAllStores = async (req: Request, res: Response) => {
  const stores = await Store.find({});

  res.send(stores);

};


exports.getStoreByZip = async (req: Request, res: Response) => {
    const { zipcode, distance } = req.params;

    //turn string into number
    const newZip = parseFloat(zipcode);
    const newDis = parseFloat(distance);
  
    // Get lat/lng from geocoder
    const loc = await geocoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;
  
    // Calc radius using radians
    // Divide dist by radius of Earth
    // Earth Radius = 3,963 mi / 6,378 km

    const radius = newDis / 3963;
  
    const stores = await Store.find({
      location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
    });
  
    res.status(200).json({
      success: true,
      count: stores.length,
      data: stores
    });
};

exports.searchStores = async (req: Request, res: Response) => {
    const request = req.body;
    let queryString = querystring.stringify(request);
  
    const stores = await Store.find({
      $text: {
        $search: queryString,
        $caseSensitive: false,
        $diacriticSensitive: true
      }
    });
  
    res.json(stores);
};

exports.createStore  = async (req: Request, res: Response) => {
  const store = Store.build({
      ...req.body,
      userId: req.currentUser!.id,
  });
  await store.save();

  res.status(201).send(store);
};

exports.updateStore = async (req: Request, res: Response) => {
};
