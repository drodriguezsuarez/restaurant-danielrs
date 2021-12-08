import mongoose from 'mongoose';

const PedidoSchema = mongoose.Schema({
    usuario: { type: mongoose.Schema.ObjectId, ref: 'Usuario', required: true },
    persona: { type: mongoose.Schema.ObjectId, ref: 'Cliente', required: true },
    total: { type: Number, maxlength: 10 },
    detalles: [{
        _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Plato', required: true },
        nombre: { type: String, maxlength: 50 },
        cantidad: { type: Number, default: 0 },
        precioventa: { type: Number, default: 0 },
    }],
    estado: { type: Number, default: 1 },
    createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('Pedido', PedidoSchema);

//     usuario:{},
//     cliente:{},
//     total:{},
//     detalles:[{

//     }],
//     estado:{},
//     createdAt:{},

// })