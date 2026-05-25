const mongoose = require('mongoose');

// Substitua <USUARIO>, <SENHA> e <CLUSTER> pelos seus dados do MongoDB Atlas
// Ou use a string que o Atlas te forneceu no "Connect"
const mongoURI = "mongodb+srv://CheckPoint:1234@checkpoint.rltzhlg.mongodb.net/Checkpoint?retryWrites=true&w=majority";

mongoose.connect(mongoURI)
.then(() => {
    console.log("✅ Conexão com MongoDB Atlas estabelecida com sucesso!");
})
.catch((err) => {
    console.error("❌ Erro ao conectar ao MongoDB:", err);
});

module.exports = mongoose;