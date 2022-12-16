import bcrypt from 'bcryptjs';

export const encryptPassword = async(password)=>{
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
}

export const comparePassword = async(newPassword,userPassword)=>{
    return await bcrypt.compare(newPassword,userPassword);
}