import { conexaoDB } from "../../config/database.js";

// Declaração das queries de busca no banco de dados - operações dentro da tabela de usuários
export const usuariosRepository = {

  // MÉTODOS DE BUSCA DE DADOS
  // Faz uma busca de todos os dados dentro da tabela de usuários
  selectAllUsers: async () => {
    return conexaoDB('tb_users');
  },

  // Faz a busca de um usuário específico pelo ID
  selectUserById: async (id) => {
    return conexaoDB('tb_users').where({user_id: id}).first();
  },

  // Busca um usuário com nase no parâmetro passado
  selectOneUserByFilter: async (filter) => {
    return conexaoDB('tb_users').where(filter).first();
  },

  // Busca vários usuários com nase no parâmetro passado
  selectUsersByFilter: async (filter) => {
    return conexaoDB('tb_users').where(filter);
  },


  // MÉTODOS PARA CRIAÇÃO DE USUÁRIOS
  // Cria um novo registro de usuário com base nos dados passados
  insertNewUser: async (data, trx = null) => {
    const query = trx || conexaoDB;
    return query('tb_users').insert(data);
  },

  // MÉTODOS PARA ATUALIZAÇÃO DE DADOS
  // Atualiza dados do usuário
  updateUserData: async (id, email, data, trx = null) => {
    const query = trx || conexaoDB;
    return query('tb_users').where({user_id: id} || {email: email}).update(data);
  },

  // Aplica o valor 'blocked' ao campo "user_status" para um soft delete
  deactivateUser: async (id, email, trx = null) => {
    const query = trx || conexaoDB;
    const currentDate = new Date();
    return query('tb_users').where({user_id: id} || {email: email}).update({user_status: 'blocked'}, {deleted_at: currentDate});
  },

  // Aplica o valor 'active' ao campo "user_status"
  activateUser: async (id, email, trx = null) => {
    const query = trx || conexaoDB;
    return query('tb_users').where({user_id: id} || {email: email}).update({user_status: 'active'});
  }
};