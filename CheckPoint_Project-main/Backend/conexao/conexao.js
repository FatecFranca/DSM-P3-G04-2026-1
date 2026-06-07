const mongoose = require('mongoose');

const mongoURI = "mongodb://CheckPoint:1234@ac-lmy2cgq-shard-00-00.rltzhlg.mongodb.net:27017,ac-lmy2cgq-shard-00-01.rltzhlg.mongodb.net:27017,ac-lmy2cgq-shard-00-02.rltzhlg.mongodb.net:27017/Checkpoint?ssl=true&replicaSet=atlas-c2f5wm-shard-0&authSource=admin&appName=CheckPoint";

mongoose.connect(mongoURI)
.then(() => {
    console.log("✅ Conexão com MongoDB Atlas estabelecida com sucesso!");
})
.catch((err) => {
    console.error("❌ Erro ao conectar ao MongoDB:", err);
});

module.exports = mongoose;