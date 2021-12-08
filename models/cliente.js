import mongoose from 'mongoose';

const ClienteSchema = mongoose.Schema({
    codigo:{type:String, required:true, maxlength:64, unique:true},
    direccion:{type:String, maxlength:80},
    telefono:{type:String, maxlength:15},
    estado:{type:Number, default:1},
    createdAt:{type:Date, default:Date.now},
})
export default mongoose.model('Cliente', ClienteSchema)