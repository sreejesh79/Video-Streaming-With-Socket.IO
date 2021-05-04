import mongoose, { Document, Schema } from "mongoose";
import { IModel } from "types";
import bcrypt from "bcrypt";

export interface IUserModel extends IModel {}


const Types = Schema.Types;
const UserSchema: Schema = new Schema({
    username: {type: Types.String, index: true, unique: true, required: true},
    password: {type: Types.String, required: true},
    email: {type: Types.String, unique: true, required: true, index: true},
    mobile: {type: Types.String, unique: true, required: true, index: true},
    firstName: { type: Types.String, index: true},
    lastName: { type: Types.String, index: true},
    token: { type: Types.String, index: true },
    active: {type: Types.Number, enum:[0,1], default:0},
});

UserSchema.pre<any>("save", function (next: any) {
    if ( this.password && this.isModified('password') ) {
        const user: any = this;
        const saltRounds = 10;
        try {
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(user.password, salt);
            user.password = hash;
            user.token = "";
            return next();
        }catch(e) {
            return next(e);
        }
    }
    return next();  

})

UserSchema.pre<any>('findOneAndUpdate', function(next : any) {
    const password = this._update.password;
    
    if (!password) {
        return next();
    }
    try {
        
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        this._update.password = hash;
        next();
    } catch (error) {
        return next(error);
    }
});;

UserSchema.set('toJSON', {
    transform(doc, ret, opt) {
        console.log('deleting');
        delete ret['password']
        return ret
    }
})

export default mongoose.model<IUserModel>('User', UserSchema);