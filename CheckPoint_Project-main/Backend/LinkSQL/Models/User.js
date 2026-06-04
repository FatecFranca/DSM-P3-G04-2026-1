const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    Nick: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    Nome: { type: String, default: "" },
    Idade: { type: Number, default: null },
    Valor: { type: Number, default: 0 },
    amigos: [{
        usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        status: { type: String, enum: ['pendente', 'aceito'], default: 'pendente' }
    }],
    criadoEm: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);