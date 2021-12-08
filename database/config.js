import mongoose from 'mongoose'

const dbconnection=async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_CNX, {
            useNewUrlParser: true,
            useUnifiedTopology: true,

        });
        console.log('Base de datos Online');
    } catch (error) {
        throw new Error('Error al iniciar la base de datos');
    }
}

export default dbconnection