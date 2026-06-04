const User = require('../Models/User');

const FriendController = {
    // Busca usuários pelo Nick para adicionar
    buscarUsuarios: async (req, res) => {
        try {
            const { nick } = req.query;
            const meuId = req.session.usuarioLogado._id;

            // Busca usuários que contenham o termo, ignorando o próprio usuário logado
            const usuarios = await User.find({
                Nick: { $regex: nick, $options: 'i' },
                _id: { $ne: meuId }
            }).select('Nick Nome _id');

            res.json({ ok: true, usuarios });
        } catch (err) {
            console.error("Erro ao buscar usuários:", err);
            res.status(500).json({ ok: false });
        }
    },

    // Enviar uma solicitação de amizade
    enviarSolicitacao: async (req, res) => {
        try {
            const meuId = req.session.usuarioLogado._id;
            const targetId = req.body.usuarioId;

            // Adiciona o pedido na conta do destinatário
            await User.findByIdAndUpdate(targetId, {
                $addToSet: { amigos: { usuarioId: meuId, status: 'pendente' } }
            });

            res.json({ ok: true, msg: "Solicitação enviada!" });
        } catch (err) {
            console.error("Erro ao enviar solicitação:", err);
            res.status(500).json({ ok: false });
        }
    },

    // Listar amigos e solicitações
    listarMeusAmigos: async (req, res) => {
        try {
            const usuario = await User.findById(req.session.usuarioLogado._id)
                .populate('amigos.usuarioId', 'Nick Nome');
            
            res.json({ ok: true, amigos: usuario.amigos || [] });
        } catch (err) {
            console.error("Erro ao listar amigos:", err);
            res.status(500).json({ ok: false });
        }
    },

    // Aceitar solicitação de amizade
    aceitarAmizade: async (req, res) => {
        try {
            const meuId = req.session.usuarioLogado._id;
            const amigoId = req.body.usuarioId;

            // Atualiza status para 'aceito' no meu documento
            await User.updateOne(
                { _id: meuId, "amigos.usuarioId": amigoId },
                { $set: { "amigos.$.status": "aceito" } }
            );

            // Adiciona eu mesmo na lista dele como aceito também
            await User.findByIdAndUpdate(amigoId, {
                $addToSet: { amigos: { usuarioId: meuId, status: 'aceito' } }
            });

            res.json({ ok: true });
        } catch (err) {
            console.error("Erro ao aceitar amizade:", err);
            res.status(500).json({ ok: false });
        }
    }
};

module.exports = FriendController;