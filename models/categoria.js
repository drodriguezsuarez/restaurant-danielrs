import mongoose from "mongoose";

const CategoriaSchema=mongoose.Schema({
    nombre:{type:String, required:true, maxlenght:50, unique:true},
    descripcion:{type:String, maxlenght:250},
    estado:{type:Number, default:1},
    createdAt:{type:Date, default:Date.now}
})

export default mongoose.model('Categoria', CategoriaSchema)