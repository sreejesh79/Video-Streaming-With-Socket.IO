import { IResponse } from "types";

export class BadRequest implements IResponse {
    error: boolean = true;
    status: number = 400;
   message: string = "Bad Request"
    
}