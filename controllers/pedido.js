import Pedido from '../models/pedido.js'
import Plato from '../models/plato.js'

const aumentarStock = async (id, cantidad) =>{
    let {stock} = await Plato.findById(id);
    stock = parseInt(stock) + parseInt(cantidad)
    await Plato.findByIdAndUpdate({id},{stock})
}
const disminuirStock = async (id, cantidad) =>{
    let {stock} = await Plato.findById(id);
    stock = parseInt(stock) - parseInt(cantidad)
    await Plato.findByIdAndUpdate({id},{stock})
}

const pedidoControllers = {
    pedidoGet: async (req, res) => {
        const pedido = await Pedido.find().populate('Usuario', 'nombre')
            .populate('Cliente', ["codigo", "direccion"])
        console.log("Dentro de pedido GET")
        console.log(pedido)
        res.json({
            pedido
        })
    },
    pedidoGetById: async (req, res) => {
        const { id } = req.params
        const pedido = await Pedido.findById(id).populate('Usuario', 'nombre')
            .populate('Cliente', ["codigo", "direccion"])

        res.json({
            pedido
        })
    },
    pedidoPost: async (req, res) => {

        const { usuario, cliente, categoria, total, detalles } = req.body
        const pedido = new Pedido({ usuario, cliente, categoria, total, detalles })
        //Quité persona

        await pedido.save();
        detalles.map((articulo) => aumentarStock(articulo.id, articulo.cantidad)) 
        res.json({
            pedido
        })
    },
    pedidoActivar: async (req, res) => {
        console.log("dentro de activar")
        const { id } = req.params

        const pedido = await Pedido.findByIdAndUpdate(id, { estado: 1 });
        detalles.map((articulo) => aumentarStock(articulo.id, articulo.cantidad)) 

        res.json({
            pedido 
        })
    },
    pedidoDesactivar: async (req, res) => {
        console.log("dentro de desactivar")
        const { id } = req.params

        const pedido = await Pedido.findByIdAndUpdate(id, { estado: 0 });
        detalles.map((articulo) => disminuirStock (articulo.id, articulo.cantidad)) 

        res.json({
            pedido
        })
    }
}
export default pedidoControllers
