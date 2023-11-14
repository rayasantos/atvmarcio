require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env
const pgp = require('pg-promise')();

const connectionString = process.env.DATABASE_URL; // A URL do banco de dados deve ser configurada nas variáveis de ambiente
const db = pgp(connectionString);

// Script SQL para criar a tabela diretores
const createDiretoresTable = `
  CREATE TABLE IF NOT EXISTS diretores (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    idade INTEGER NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    salario DECIMAL(10, 2) NOT NULL
  );
`;

// Execute o script SQL para criar a tabela
db.none(createDiretoresTable)
  .then(() => {
    console.log('Tabela diretores criada com sucesso.');
  })
  .catch((error) => {
    console.error('Erro ao criar a tabela diretores:', error);
  });

// Exporta a instância do banco de dados para ser utilizado em outras partes do aplicativo
module.exports = db;
