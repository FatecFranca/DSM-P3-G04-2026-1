const Event = require('../Models/Event');
const Gasto = require('../Models/Gasto');

module.exports = {
    criar: async (req, res) => {
        try {
            const { nomeEvento, valorEvento, dataEvento, localEvento, QuantParticipantes } = req.body;
            const idUser = req.session.usuarioLogado._id;
            const novoEvento = new Event({ fk_idUsuario: idUser, nomeEvento, dataEvento, localEvento, QuantParticipantes });
            const salvo = await novoEvento.save();

            const valorLimpo = parseFloat(String(valorEvento).replace("R$", "").replace(/\./g, "").replace(",", "."));
            await new Gasto({ fk_idUsuario: idUser, fk_idEvento: salvo._id, valorGasto: valorLimpo, categoria: 'eventos', descricao: `Rolê: ${nomeEvento}` }).save();

            res.json({ ok: true });
        } catch (err) { res.status(500).json({ ok: false }); }
    },

    listarEventos: async (req, res) => {
        try {
            const eventos = await Event.find({ fk_idUsuario: req.session.usuarioLogado._id });
            res.json({ ok: true, eventos });
        } catch (err) { res.status(500).json({ ok: false }); }
    },

    quantidade: async (req, res) => {
        try {
            const total = await Event.countDocuments({ fk_idUsuario: req.session.usuarioLogado._id });
            res.json({ ok: true, total });
        } catch (err) { res.status(500).json({ ok: false, total: 0 }); }
    },

    buscarEvento: async (req, res) => {
        try {
            const evento = await Event.findById(req.params.id);
            const gasto = await Gasto.findOne({ fk_idEvento: req.params.id });
            res.json({ ok: true, evento, gasto });
        } catch (err) { res.status(500).json({ ok: false }); }
    },

    excluir: async (req, res) => {
        try {
            await Event.findByIdAndDelete(req.body.id);
            await Gasto.deleteMany({ fk_idEvento: req.body.id });
            res.json({ ok: true });
        } catch (err) { res.status(500).json({ ok: false }); }
    }
};