import Responses from "config/responses";
import User, { IUserModel } from "models/user.model";
import { IResponse } from "types";

class UserService {

    private static _singleton: boolean = true;
    private static _instance: UserService;

    constructor() {
        if (UserService._singleton) {
            throw new SyntaxError("This is a singleton class. Please use UserService.instance instead!");
        }
    }

    public static get instance(): UserService{
        if (!this._instance) {
            this._singleton = false;
            this._instance = new UserService();
            this._singleton = true;
        }
        return this._instance;
    }

    public create = async (body: any): Promise<IResponse> => {
        try {
            const createUser: IUserModel = await User.create(body);
            const response: IResponse = Responses[200](createUser);
           return response;
        } catch (e) {
            console.log(e);
            return Responses[500](e.message);
        }
    }

    public read = async (id?: string): Promise<IResponse> => {
        try {
            if (!id && id != '') {
                const users: Array<IUserModel> = await User.find();
                const response: IResponse = Responses[200](users);
                return response;

            }else {
                const user: IUserModel = await User.findById(id);
                if (user && user.hasOwnProperty('_id')) {
                    return Responses[200](user);
                } else {
                    return Responses[404]('User not found');
                }
            }
        } catch (e) {
            return Responses[500](e.message);
        }
    }

    public update = async (id: string, body: any): Promise<IResponse> => {
        try {
            const updatedUser: IUserModel = await User.findByIdAndUpdate(id, body, {new: true});
            if (updatedUser._id) {
                return Responses[200](updatedUser);
            } else {
                return Responses[404]('User not found');
            }
        } catch (e) {
            return Responses[500](e.message);
        }
    }

    public delete = async (id: string): Promise<IResponse> => {
        try {
            const deletedUser: IUserModel = await User.findByIdAndDelete(id);
            if (deletedUser._id) {
                return Responses[200](deletedUser);
            } else {
                return Responses[404]('User not found');
            }
        } catch (e) {
            return Responses[500](e.message);

        }
    }
}

export default UserService.instance;