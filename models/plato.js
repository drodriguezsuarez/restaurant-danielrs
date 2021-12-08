import mongoose from "mongoose";

const PlatoSchema=mongoose.Schema({
    categoria:{type:mongoose.Schema.Types.ObjectId, ref:'categoria', required:true},
    codigo:{type:String, required:true, maxlength:64, unique:true},
    nombre:{type:String, required:true, maxlength:80, unique:true},
    descripcion:{type:String, maxlength:250},
    precioVenta:{type:Number, default:0},
    stock:{type:Number, default:0},
    estado:{type:Number, default:1},
    createdAt:{type:Date, default:Date.now}
})

export default mongoose.model('Plato', PlatoSchema)