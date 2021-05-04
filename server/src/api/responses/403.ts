import { IResponse } from "types";

export class Forbidden implements IResponse {
    error: boolean = true;
    status: number = 403;
    message: string = "Forbidden"
    
    constructor(msg: string = '') {
        this.message = `${this.message} ${msg}`;
    }
}
