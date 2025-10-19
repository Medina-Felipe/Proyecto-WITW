import mongoose from "mongoose";

const connectDB = async ()=> {
    try{

        const uri = "mongodb://localhost:27017/"; //URL dependiendo en entorno (modo actual: local)
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("conectado a mongoDB")
    } catch(error){
        console.error("Error al conectar: ", error);
    }
};