const mongoose=require('mongoose');
const {serverConfig}=require('../config/config');

const dbConnection=async()=>{
    try{
        await mongoose.connect(serverConfig.mongoUrl);
        
        console.log('Base de datos conectada');
    }catch(error){
        console.log('Error en la base de datos',error);

    }
}

dbConnection()