import mongoose from "mongoose";

export const dbConnection = async() => {
    try {
        mongoose.set('strictQuery',true);
        await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        console.log('Database Connected');
    } catch (error) {
        console.log(error);
        throw new Error('Error en la conexión con la base de datos');
    }
};