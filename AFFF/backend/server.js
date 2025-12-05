// backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); 

// Carrega variáveis de ambiente
dotenv.config();

// Conecta ao MongoDB 
const connectDB = async () => {
 try {
    // Usando MONGODB_URI do .env
    await mongoose.connect(process.env.MONGODB_URI); 
    console.log('MongoDB conectado com sucesso!');
} catch (err) {
   console.error('Falha na conexão com o MongoDB:', err.message);
  process.exit(1);  }
};

connectDB();

const app = express();

// Configuração do CORS (para permitir o Angular acessar)
app.use(cors()); 
// Habilita o Express a ler JSON
app.use(express.json()); 

// Importa e usa as rotas
const transacaoRoutes = require('./routes/transacao.routes');

app.use('/api/transacoes', transacaoRoutes); 

// Porta 3000
const PORT = 3000; 

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));