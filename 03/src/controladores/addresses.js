const fs = require('fs/promises');
const {
  buscarEndereco
} = require('utils-playground');

const requireCep = async (req, res) => {
  const {
    cep
  } = req.params;

  const cepFormatado = `${cep.substr(0,5)}-${cep.substr(5)}`



  try {

    const endereco = await buscarEndereco(cepFormatado)

    if (!endereco) {
      return res.status(400).json("CEP inválido! Verifique digitação.")
    }

    const arrayEndereco = await fs.readFile("./03/src/enderecos.json");

    const parseEndereco = JSON.parse(arrayEndereco);


    const existeCep = parseEndereco.find((item) => {
      return item.cep === cepFormatado
    })

    if (existeCep) {
      return res.json(endereco);
    }

    if (!existeCep) {
      parseEndereco.push(endereco);
      await fs.writeFile("./03/src/enderecos.json", JSON.stringify(parseEndereco));
      return res.status(201).json({
        menssage: "Endereço adicionado: ",
        endereco
      })
    }


  } catch (error) {
    res.status(400).json("Erro na digitação. Verifique os caracteres.")
  }
}

module.exports = {
  requireCep
}