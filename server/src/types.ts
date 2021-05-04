import { Document } from "mongoose";


export interface IUser {
    uid: string,
    expires: number
}

export interface IResponse {
    error: boolean;
    status: number;
}

export interface IModel extends Document {}