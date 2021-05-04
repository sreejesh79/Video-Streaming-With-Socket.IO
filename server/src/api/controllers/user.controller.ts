import { Request, Response, NextFunction } from "express";
import UserService from 'services/user.service';
import { IResponse } from "types";

export class UserController {
    
  public static create = async (req: Request, res: Response): Promise<any> => {
    console.log('in create');
    const response: IResponse = await UserService.create(req.body);
    return res.status(response.status).json(response);
  }

  public static get = async (req: Request, res: Response): Promise<any> => {
    const response: any = await UserService.read(req.params.id);
    return res.status(response.status).json(response);
  }

  public static update = async (req: Request, res:Response):Promise<any> => {
    const response: IResponse = await UserService.update(req.params.id, req.body);
    return res.status(response.status).json(response);
  }

  public static delete = async (req: Request, res:Response):Promise<any> => {
    const response: IResponse = await UserService.delete(req.params.id);
    return res.status(response.status).json(response);
  }
}
  