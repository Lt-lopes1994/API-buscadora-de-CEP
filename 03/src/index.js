const express = require('express');

const app = express();
const rotas = require('./roteador/rotas')

app.use(express.json());

app.use(rotas);

app.listen(3000)