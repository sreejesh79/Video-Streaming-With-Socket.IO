import { IResponse } from "types";

export class NotFound implements IResponse {
    error: boolean = true;
    status: number = 404;
    message: string = "Not Found"
    
    constructor(msg: string = '') {
        this.message = `${this.message} ${msg}`;
    }
}
