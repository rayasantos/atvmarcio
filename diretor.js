require('dotenv').config();
const db = require('./db');

class Diretor {
  constructor(nome, idade, cep, cpf, salario) {
    this.nome = nome;
    this.idade = idade;
    this.cep = cep;
    this.cpf = cpf;
    this.salario = salario;
  }

  static async getAll() {
    return db.many('SELECT * FROM diretores');
  }

  static async create(nome, idade, cep, cpf, salario) {
    return db.one('INSERT INTO diretores (nome, idade, cep, cpf, salario) VALUES ($1, $2, $3, $4, $5) RETURNING *', [nome, idade, cep, cpf, salario])
      .then(data => new Diretor(data.nome, data.idade, data.cep, data.cpf, data.salario));
  }

  static async getByCpf(cpf) {
    return db.one('SELECT * FROM diretores WHERE cpf = $1', cpf)
      .then(data => new Diretor(data.nome, data.idade, data.cep, data.cpf, data.salario));
  }

  static async updateByCpf(cpf, nome, idade, cep, salario) {
    return db.one('UPDATE diretores SET nome = $1, idade = $2, cep = $3, salario = $4 WHERE cpf = $5 RETURNING *', [nome, idade, cep, salario, cpf])
      .then(data => new Diretor(data.nome, data.idade, data.cep, data.cpf, data.salario));
  }

  static async deleteByCpf(cpf) {
    return db.none('DELETE FROM diretores WHERE cpf = $1', cpf);
  }
}

module.exports = Diretor;