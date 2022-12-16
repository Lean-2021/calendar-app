import moment from "moment";
import { User } from "../models/index.js";

export const validateEmail = async(email)=>{

    const user = await User.findOne({email});

    if(user){
        throw new Error(`Ya existe un usuario con el email ${email}`);
    }
};

export const validateUser = async(email)=>{

    const user = await User.findOne({email});

    if(!user){
        throw new Error('Usuario y/o password incorrectos');
    }
};

export const isDate = (value) => {
    if(!value){
        return false
    }
    const date = moment(value);
    if(date.isValid()){
        return true
    } else{
        return false
    }
};

