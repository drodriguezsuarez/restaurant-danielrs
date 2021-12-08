import Plato from "../models/plato.js";
import Categoria from "../models/categoria.js"

const platoControllers = {
    platoGet: async (req, res) => {
        const platos = await Plato.find().populate('categoria','nombre')
        const categorias = await Categoria.find().populate('categoria', 'nombre');
        res.json({
            platos, categorias
        })
    },
    platoGetById: async (req, res) => {
        const {id} = req.params;
        const plato = await Plato.findById(id).populate('categoria','nombre')
        res.json({
            plato
        })
    },
    platoPost: async (req, res) => {
        const {categoria, codigo, nombre, descripcion, precioVenta, stock} = req.body;
        const plato = new Plato({categoria, codigo, nombre, descripcion, precioVenta, stock})
        await plato.save();
        res.json({
            plato
        })
    },
    platoPut: async (req, res) => {
        const {id} = req.params;
        const {_id, createdAt, __v,...resto} = req.body;
        const plato = await Plato.findByIdAndUpdate(id, resto);
        console.log(req.body);
        res.json({
            plato
        })
    },
    platoPutActive: async (req, res) => {
        const {id} = req.params;
        const plato = await Plato.findByIdAndUpdate(id,{estado:1});
        res.json({
            plato
        })
    },
    platoPutDisable: async (req, res) => {
        const {id} = req.params;
        const plato = await Plato.findByIdAndUpdate(id,{estado:0});
        res.json({
            plato
        })
    },
    platoDelete: async (req, res) => {
        const {id} = req.params;
        const plato = await Plato.findByIdAndDelete(id);
        res.json({
            plato
        })
    }
}
export default platoControllers