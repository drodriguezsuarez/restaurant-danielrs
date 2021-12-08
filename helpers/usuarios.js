import Usuario from "../models/usuario.js"


const existeUsuariobyId=async(id)=>{
    const existe=await Usuario.findById(id);
    if(!existe){
        throw new Error('El ID  no existe');
    }
}

export {existeUsuariobyId}