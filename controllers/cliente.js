import Cliente from "../models/cliente.js";

const clienteControllers = {
    clienteGet: async (req, res) => {
        const value = req.query.value
        const clientes = await Cliente.find({
            $or:[
                {codigo: new RegExp(value, 'i')},
                {direccion: new RegExp(value, 'i')},
                {telefono: new RegExp(value, 'i')}
            ]
        });
        res.json({
            clientes
        })
    },
    clienteGetById: async (req, res) => {
        const {id} = req.params
        const cliente = await Cliente.findById(id)
        res.json({
            cliente
        })
    },
    clientePost: async (req, res) => {
        const {codigo, direccion, telefono} = req.body;
        const cliente = new Cliente({codigo, direccion, telefono});
        console.log(usuario)
        await cliente.save();

        res.json({
            cliente
        })
    },
    clientePut: async (req, res) => {
        const {id} = req.params
        const {_id, estado, createdAt, __v,...resto} = req.body
        const cliente = await Cliente.findByIdAndUpdate(id, resto)
        res.json({
            cliente
        })
    },
    clienteDelete: async (req, res) => {
        const {id} = req.params
        const cliente = await Cliente.findByIdAndDelete(id)
        res.json({
            cliente
        })
    },
}
export default clienteControllers;