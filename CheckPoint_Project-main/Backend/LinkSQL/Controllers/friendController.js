const User = require('../Models/User');

const FriendController = {
    buscarUsuarios: async (req, res) => {
        try {
            const { nick } = req.query;
            const meuId = req.session.usuarioLogado._id;
            const usuarios = await User.find({
                Nick: { $regex: nick, $options: 'i' },
                _id: { $ne: meuId }
            }).select('Nick Nome _id');
            res.json({ ok: true, usuarios });
        } catch (err) { res.status(500).json({ ok: false }); }
    },

    enviarSolicitacao: async (req, res) => {
        try {
            const meuId = req.session.usuarioLogado._id;
            const targetId = req.body.usuarioId;

            // Verifica se já existe
            const destinatario = await User.findById(targetId);
            const jaExiste = destinatario.amigos.find(a => a.usuarioId.toString() === meuId.toString());

            if (jaExiste) {
                return res.status(400).json({ ok: false, msg: "Solicitação já enviada!" });
            }

            await User.findByIdAndUpdate(targetId, {
                $addToSet: { amigos: { usuarioId: meuId, status: 'pendente' } }
            });
            res.json({ ok: true });
        } catch (err) { res.status(500).json({ ok: false }); }
    },

    // Listar todos os registros de amizade (Pedidos e Aceitos)
    listarMeusAmigos: async (req, res) => {
        try {
            const usuario = await User.findById(req.session.usuarioLogado._id)
                .populate('amigos.usuarioId', 'Nick Nome');
            
            res.json({ ok: true, amigos: usuario.amigos || [] });
        } catch (err) { res.status(500).json({ ok: false }); }
    },

    // Aceitar amizade
    aceitarAmizade: async (req, res) => {
        try {
            const meuId = req.session.usuarioLogado._id;
            const amigoId = req.body.usuarioId;

            // 1. Muda status para 'aceito' no meu documento
            await User.updateOne(
                { _id: meuId, "amigos.usuarioId": amigoId },
                { $set: { "amigos.$.status": "aceito" } }
            );

            // 2. Adiciona o remetente na lista do outro usuário como 'aceito' também
            await User.findByIdAndUpdate(amigoId, {
                $addToSet: { amigos: { usuarioId: meuId, status: 'aceito' } }
            });

            res.json({ ok: true });
        } catch (err) { res.status(500).json({ ok: false }); }
    }
};

module.exports = FriendController;