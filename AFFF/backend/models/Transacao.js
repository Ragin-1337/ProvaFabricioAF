// backend/models/Transacao.js

const mongoose = require('mongoose');

const TransacaoSchema = new mongoose.Schema({
    descricao: {
        type: String,
        required: [true, 'A descrição é obrigatória.'],
        trim: true
    },
    valor: {
        type: Number,
        required: [true, 'O valor é obrigatório.'],
        min: [0.01, 'O valor deve ser positivo.'],
    },
    data: {
        type: Date,
        required: [true, 'A data é obrigatória.'],
        default: Date.now
    },
    tipo: {
        type: String,
        required: [true, 'O tipo (receita/despesa) é obrigatório.'],
        enum: ['receita', 'despesa'],
    },
    categoria: {
        type: String,
        required: [true, 'A categoria é obrigatória.'],
        enum: ['salario', 'aluguel', 'alimentacao', 'transporte', 'lazer', 'outros'],
    },
}, {
    timestamps: true 
});

module.exports = mongoose.model('Transacao', TransacaoSchema);