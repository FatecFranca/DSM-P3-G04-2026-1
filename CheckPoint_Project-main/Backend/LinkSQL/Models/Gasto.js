const mongoose = require('mongoose');

const GastoSchema = new mongoose.Schema({
    fk_idUsuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    fk_idEvento: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', default: null },
    valorGasto: { type: Number, required: true },
    categoria: { 
        type: String, 
        enum: ['alimentação', 'transporte', 'lazer', 'educação', 'saúde', 'roupas', 'moradia', 'eventos', 'outros'],
        default: 'outros'
    },
    descricao: { type: String },
    dataGasto: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Gasto', GastoSchema);