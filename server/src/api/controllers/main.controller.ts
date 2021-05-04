import { Request, Response, NextFunction } from "express";

export class MainController {

    public static index = async(req: Request, res: Response, next: NextFunction) =>{
        try {
            res.status(200).send('Welcome to Express Boilerplate');
          } catch (err) {
            next(err);
          }
    }
    
}