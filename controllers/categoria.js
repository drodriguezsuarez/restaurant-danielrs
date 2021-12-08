import Categoria from "../models/categoria.js";

const categoriaControllers = {
    
    categoriaGet: async (req, res) => {
        const value = req.query.value;
        const categorias = await Categoria
            .find({
                $or:[
                    { nombre: new RegExp(value, 'i')},
                    { descripcion: new RegExp(value, 'i')}
                ]
            })
            .sort({'createAt':1})
            console.log("dentro de categoria")
        res.json({
            categorias
        })
    },
    categoriaGetById: async (req, res) => {
        const { id } = req.params;
        const categoria = await Categoria.findOne({ _id: id })
        res.json({
            categoria 
        })
    },
    categoriaPost: async (req, res) => {
        const { nombre, descripcion } = req.body;
        const categoria = new Categoria({ nombre, descripcion });
        console.log("dentro de post categoria")
        console.log(categoria)
        await categoria.save();

        res.json({
            categoria
        })
    },
    categoriaPut: async (req, res) => {
        const {id}=req.params
        const {_id,estado,createdAt,__v,...resto}=req.body
        const categoria = await Categoria.findByIdAndUpdate( id, resto);
        console.log(req.body);
        console.log("Intento de actualizar esto");
        res.json({
            categoria
        })
    },
    categoriaPutActive: async (req, res) => {
        const {id}=req.params;
        const categoriaActive = await Categoria.findByIdAndUpdate(id,{estado:1})
        res.json({
            categoriaActive
        })
    },
    categoriaPutDisable: async (req, res) => {
        const {id}=req.params;
        const categoriaDisable = await Categoria.findByIdAndUpdate(id,{estado:0})
        res.json({
            categoriaDisable
        })
    },
    categoriaDelete: async (req, res) => {
        const {id}= req.params;
        const categoria = await Categoria.findByIdAndDelete(id)
        console.log("dentro de delete")
        console.log(id)
        
        res.json({
            categoria
        })
    }
}
export default categoriaControllers