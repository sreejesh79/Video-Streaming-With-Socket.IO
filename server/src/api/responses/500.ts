import { IResponse } from "types";

export class ServerError implements IResponse {
    error: boolean = true;
    status: number = 500;
    message: string = "Internal Server Error"
    
    constructor(msg: string) {
        this.message = `${this.message} ${msg}`;
    }
}
