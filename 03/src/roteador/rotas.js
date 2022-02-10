const express = require('express');
const {
  requireCep
} = require('../controladores/addresses')
const rotas = express();

rotas.get('/enderecos/:cep', requireCep)


module.exports = rotas