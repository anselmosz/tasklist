import { usuariosRepository } from "./usuarios.repository.js";

export const usuariosService = {
  criarUsuario: async (data) => {
    if (!data.email || !data.email || !data.senha) {
      throw new Error('Campos obrigatóros faltando para criação de usuário')
    };

    const payload = {
      nome: data.nome.trim(),
      email: data.email.toLowerCase(),
      senha_hash: data.senha
    };

    const [id] = await usuariosRepository.insertNewUser(payload);
    return {user_id: id, ...payload};
  },

  buscarUsuarios: async () => {
    const usuarios = await usuariosRepository.selectAllUsers();

    if (!usuarios) throw new Error();

    return usuarios;
  },

  buscarUsuarioPorId: async (id) => {
    const usuario = await usuariosRepository.selectUserById(id);
    if (!usuario) return null;
    return usuario;
  },


};