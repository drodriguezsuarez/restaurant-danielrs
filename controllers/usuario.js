import Usuario from '../models/usuario.js'
import { validarJWT, generarJWT } from '../middlewares/validar-jwt.js'

const usuarioControllers = {
    userGet: async (req, res) => {
        const value = req.query.value
        const usuarios = await Usuario.find({
            $or:[
                {nombre: new RegExp(value, 'i')},
                {email: new RegExp(value, 'i')},
                {rol: new RegExp(value, 'i')}
            ]
        });
        res.json({
            usuarios
        })
    },
    userGetById: async (req, res) => {
        const {id} = req.params
        const usuario = await Usuario.findById(id)
        
        res.json({
            usuario
        })
    },
    userLogin: async (req, res) => {
        const {email,password}=req.body;
        const usuario = await Usuario.findOne({email:email})
        if( ! usuario){
            return res.json({
                msg:'Los datos de usuario son incorrectos email' 
            })
        }
        if(usuario.estado===0){
            return res.json({
                msg:'Usuario no encontrado, desactivado'
            })
        }
        const validarPassword = Usuario.findOne(password,usuario.password);
        if( ! validarPassword){
            return res.json({
                msg:'Los datos del usuario son incorrectos contaseña'
            })
        }
        const token = await generarJWT(usuario.id);
        generarJWT()

        res.json({
            usuario,
            token
        })
    },
    token:async(req,res,next)=>{
        validarJWT(req,res,next);
    },
    userPost: async (req, res) => {
        const {nombre, email, password, rol} = req.body;
        const usuario = new Usuario({nombre, email, password, rol});

        await usuario.save();

        res.json({
            usuario
        })
    },
    userPut: async (req, res) => {
        const {id} = req.params
        const {_id, createdAt, estado, __v, rol, password,...resto} = req.body
        const usuario = await Usuario.findByIdAndUpdate(id, resto)
        res.json({
            usuario
        })
    },
    userPutActive: async (req, res) => {
        const {id} = req.params
        const usuario = await Usuario.findByIdAndUpdate(id,{estado:1})

        res.json({
            usuario
        })
    },
    userPutDisable: async (req, res) => {
        const {id} = req.params
        const usuario = await Usuario.findByIdAndUpdate(id,{estado:0})

        res.json({
            usuario
        })
    },
    userDelete: async (req, res) => {
        const {id} = req.params
        const usuario = await Usuario.findByIdAndDelete(id)

        res.json({
            usuario
        })
    },
}
export default usuarioControllers;