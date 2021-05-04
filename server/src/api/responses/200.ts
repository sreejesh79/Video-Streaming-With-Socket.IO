import { IModel, IResponse } from "types";


export class OK implements IResponse {
    error: boolean = false;
    status: number = 200;
    data: any;
    
    constructor(data:any) {
        this.data = data;
    }
}
