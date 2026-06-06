const User = require('../Models/User');
const bcrypt = require('bcrypt');

const UserController = {
    cadastrar: async (req, res) => {
        try {
            const { Nick, email, senha } = req.body;
            if (!Nick || !email || !senha) return res.status(400).json({ sucesso: false, mensagem: "Preencha tudo!" });

            const senhaCripto = await bcrypt.hash(senha, 10);
            const novoUsuario = new User({ Nick, email, senha: senhaCripto });

            await novoUsuario.save();
            req.session.usuarioLogado = novoUsuario;
            req.session.save(() => res.redirect("/menu_inicial.html"));
        } catch (erro) {
            console.error(erro);
            res.status(400).json({ sucesso: false, mensagem: "Nick ou Email já cadastrado." });
        }
    },

    login: async (req, res) => {
        try {
            const { Nick, senha } = req.body;
            const usuario = await User.findOne({ Nick });
            if (!usuario) return res.redirect("/index_erro.html");

            const senhaOk = await bcrypt.compare(senha, usuario.senha);
            if (senhaOk) {
                req.session.usuarioLogado = usuario;
                req.session.save(() => res.redirect("/menu_inicial.html"));
            } else {
                res.redirect("/index_erro.html");
            }
        } catch (erro) { res.status(500).send("Erro interno"); }
    },

    recuperar: async (req, res) => {
        try {
            const { Nick, Email } = req.body;
            const usuario = await User.findOne({ Nick, email: Email });
            if (!usuario) return res.status(400).json({ sucesso: false, mensagem: "Dados incorretos" });

            const codigo = Math.floor(100000 + Math.random() * 900000).toString();
            usuario.codigo = codigo;
            await usuario.save();
            
            console.log("CÓDIGO GERADO (MongoDB):", codigo);
            res.redirect("/verificar.html");
        } catch (erro) { res.status(500).send("Erro"); }
    },

    verificar: async (req, res) => {
        try {
            const { codigo } = req.body;
            const usuario = await User.findOne({ codigo });
            if (!usuario) return res.status(400).json({ sucesso: false, mensagem: "Código inválido" });

            req.session.usuarioLogado = usuario;
            res.redirect("/menu_inicial.html");
        } catch (erro) { res.status(500).send("Erro"); }
    },

    editar_perfil: async (req, res) => {
        try {
            const idUser = req.session.usuarioLogado._id;
            const { Nick, Nome, Idade, Valor, email, senha } = req.body;
            const updateData = { Nick, Nome, Idade, Valor, email };
            if (senha) updateData.senha = await bcrypt.hash(senha, 10);

            const userAtualizado = await User.findByIdAndUpdate(idUser, updateData, { new: true });
            req.session.usuarioLogado = userAtualizado;
            req.session.save(() => res.redirect("/menu_inicial.html?sucesso=1"));
        } catch (erro) { res.status(500).send("Erro"); }
    },

    saldo: async (req, res) => {
        try {
            const { Valor } = req.body;
            const idUser = req.session.usuarioLogado._id;
            await User.findByIdAndUpdate(idUser, { Valor });
            req.session.usuarioLogado.Valor = Valor;
            req.session.save(() => res.json({ ok: true, novoValor: Valor }));
        } catch (erro) { res.status(500).json({ ok: false }); }
    }
};

module.exports = UserController;