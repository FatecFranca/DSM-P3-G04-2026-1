const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    fk_idUsuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    nomeEvento: { type: String, required: true },
    dataEvento: { type: Date, required: true },
    localEvento: { type: String },
    QuantParticipantes: { type: Number, default: 1 }
});

module.exports = mongoose.model('Event', EventSchema);