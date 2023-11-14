// index.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const pgp = require('pg-promise')();

const port = process.env.PORT || 3000;

// Importe a classe Diretor
const Diretor = require('./diretor');

app.use(bodyParser.json());

// Rota para listar todos os diretores
app.get('/diretores', async (req, res) => {
  try {
    const diretores = await Diretor.getAll();
    res.setHeader('Content-Type', 'application/json');
    res.json(diretores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar os diretores' });
  }
});

// Rota para criar um diretor
app.post('/diretores', async (req, res) => {
  try {
    const { nome, idade, cep, cpf, salario } = req.body;
    const newDiretor = await Diretor.create(nome, idade, cep, cpf, salario);
    res.json(newDiretor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar o diretor' });
  }
});

// Rota para buscar um diretor por CPF
app.get('/diretores/:cpf', async (req, res) => {
  try {
    const cpf = req.params.cpf;
    const diretor = await Diretor.getByCpf(cpf);
    if (diretor) {
      res.json(diretor);
    } else {
      res.status(404).json({ error: 'Diretor não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar o diretor' });
  }
});

// Rota para atualizar um diretor por CPF
app.put('/diretores/:cpf', async (req, res) => {
  try {
    const cpf = req.params.cpf;
    const { nome, idade, cep, salario } = req.body;
    const diretorAtualizado = await Diretor.updateByCpf(cpf, nome, idade, cep, salario);
    res.json(diretorAtualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar o diretor' });
  }
});

// Rota para excluir um diretor por CPF
app.delete('/diretores/:cpf', async (req, res) => {
  try {
    const cpf = req.params.cpf;
    await Diretor.deleteByCpf(cpf);
    res.json({ mensagem: 'Diretor excluído com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir o diretor' });
  }
});

// Inicie o servidor
app.listen(port, () => {
  console.log(`Servidor está ouvindo na porta ${port}`);
});
