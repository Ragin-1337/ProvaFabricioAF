// backend/routes/transacao.routes.js

const express = require('express');
const router = express.Router();
const Transacao = require('../models/Transacao');

// GET /api/transacoes - Lista todas
router.get('/', async (req, res) => {
    try {
        const transacoes = await Transacao.find().sort({ data: -1 });
        
        // Mapeia _id para id para compatibilidade com o Angular
        const response = transacoes.map(t => ({
            id: t._id,
            descricao: t.descricao,
            valor: t.valor,
            data: t.data,
            tipo: t.tipo,
            categoria: t.categoria,
        }));
        
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST /api/transacoes - Cria nova
router.post('/', async (req, res) => {
    const novaTransacao = new Transacao(req.body);

    try {
        const transacaoSalva = await novaTransacao.save();
        
        // Mapeia _id para id para retorno
        const response = {
            id: transacaoSalva._id,
            descricao: transacaoSalva.descricao,
            valor: transacaoSalva.valor,
            data: transacaoSalva.data,
            tipo: transacaoSalva.tipo,
            categoria: transacaoSalva.categoria,
        };
        
        res.status(201).json(response); 
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE /api/transacoes/:id - Remove
router.delete('/:id', async (req, res) => {
    try {
        const transacao = await Transacao.findByIdAndDelete(req.params.id);
        
        if (!transacao) {
            return res.status(404).json({ message: 'Transação não encontrada.' });
        }
        res.status(204).send(); 
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;