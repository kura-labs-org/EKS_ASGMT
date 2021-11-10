import { Request, Response, NextFunction } from "express";

export const errorhandler = (
    err: Error,
    req: Request,
    res: Response, 
    next: NextFunction
) => {
    console.log('something not workinf', err)

    res.status(400).send({
        message: 'Something not working'
    })
}