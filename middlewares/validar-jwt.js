import jwt from 'jsonwebtoken'
import { existeUsuariobyId } from '../helpers/usuarios.js';
import Usuario from '../models/usuario.js';

const generarJWT=(uid='')=>{
    return new Promise((resolve, reject)=>{
        //checkToken(id);
        const payload={uid};

        jwt.sign(payload, process.env.SECRETPRIVATEKEY,{
            expiresIn:'7d'
        },(err,token)=>{
            if(err){
                reject('No se pudo generar el token')
            }else{
                resolve(token)
            }
        })
    })
}
const validarJWT=async(req,res,next)=>{
    const token=req.header('token');
    var frontend = req.header('frontend');
    if(!token){

        return res.status(401).json({
            msg:'No hay token en la peticion'
        })
    }
    try {
        const {uid}=jwt.verify(token,process.env.SECRETPRIVATEKEY);
        const usuario = await Usuario.findById(uid)
        if(!usuario){

            return res.status(401).json({
                msg:'Token no válido'
            })
        }
        else if(usuario.estado===0){

            return res.status(401).json({
                msg:'Token no válido'
            })
        }
         else if(frontend == 1){
            res.sendStatus(200).json();
            frontend = 0;
        } 

        req.usuario=usuario;
        console.log("Todo bien")
        next();

    } catch (error) {
        console.log(error)
  /*       return res.status(401).json({
            msg:'Tokon no valido en error'
        }) */
    }
}
async function checkToken  (token){
    let __id=null;
    try {
        const {_id} = await jwt.decode(token);
        __id=_id;
        const existeUsuario=existeUsuariobyId(_id);
        console.log(_id)
        console.log(existeUsuario)
    } catch (error) {
        console.log(error)
        return false;
    }
}
export {generarJWT, validarJWT, checkToken};