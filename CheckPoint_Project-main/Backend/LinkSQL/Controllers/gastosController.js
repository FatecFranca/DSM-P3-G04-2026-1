const Gasto = require('../Models/Gasto');
const mongoose = require('mongoose');

module.exports = {
    novoGasto: async (req, res) => {
        try {
            const { valor, categoria, descricao } = req.body;
            const novo = new Gasto({
                fk_idUsuario: req.session.usuarioLogado._id,
                valorGasto: valor,
                categoria,
                descricao
            });
            await novo.save();
            res.json({ ok: true });
        } catch (err) { res.status(500).json({ ok: false }); }
    },

    listar: async (req, res) => {
        try {
            const idUser = new mongoose.Types.ObjectId(req.session.usuarioLogado._id);
            const hoje = new Date();
            const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);

            const gastos = await Gasto.find({ fk_idUsuario: idUser }).sort({ dataGasto: -1 }).limit(20);
            const totalAgg = await Gasto.aggregate([
                { $match: { fk_idUsuario: idUser, dataGasto: { $gte: inicioMes } } },
                { $group: { _id: null, total: { $sum: "$valorGasto" } } }
            ]);
            const pizzaAgg = await Gasto.aggregate([
                { $match: { fk_idUsuario: idUser } },
                { $group: { _id: "$categoria", total: { $sum: "$valorGasto" } } }
            ]);

            res.json({
                ok: true,
                gastos: gastos.map(g => ({ ...g._doc, dataFormatada: g.dataGasto.toLocaleDateString('pt-BR') })),
                total: totalAgg[0]?.total || 0,
                renda: req.session.usuarioLogado.Valor || 0,
                dadosPizza: pizzaAgg.map(p => ({ categoria: p._id, total: p.total }))
            });
        } catch (err) { res.status(500).json({ ok: false }); }
    },

    editar: async (req, res) => {
        try {
            const { idDespesa, valor, categoria, descricao } = req.body;
            await Gasto.findByIdAndUpdate(idDespesa, { valorGasto: valor, categoria, descricao });
            res.json({ ok: true });
        } catch (err) { res.status(500).json({ ok: false }); }
    },

    deletar: async (req, res) => {
        try {
            await Gasto.findByIdAndDelete(req.body.idDespesa);
            res.json({ ok: true });
        } catch (err) { res.status(500).json({ ok: false }); }
    }
};