import { usuariosRepository } from "./usuarios.repository.js";
import bcrypt from 'bcrypt'

export const usuariosService = {
  criarUsuario: async (data) => {
    
    if (!data.email || !data.email || !data.senha) {
      throw new Error('Campos obrigatóros faltando para criação de usuário')
    };

    const SALT_ROUNDS = 10; // número de rounds para o bcrypt - pode ser alterado conforme a necessidade
    
    // gera o hash da senha utilizando bcrypt e o número de rounds definido
    const senhaHash = await bcrypt.hash(data.senha, SALT_ROUNDS);

    const payload = {
      nome: data.nome,
      email: data.email.toLowerCase(),
      senha_hash: senhaHash
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

  atualizarDadosDoUsuario: async (id, data) => {
    // const payload = {
    //   nome: data.nome,
    //   email: data.email.toLowerCase(),
    //   senha_hash: data.senha
    // }

    try {
      // atualiza os dados do usuário no banco de dados
      const linhasAfetadas = await usuariosRepository.updateUserData(id, data);
      // se nenhum registro for atualizado, retorna um campo encontrado como false
      if (linhasAfetadas === 0) return { encontrado: false }; 

      // se a operação for bem sucedida, retorna o campo sucesso como true
      return { sucesso: true }; 
    } 
    catch (error) {
      throw error; // Erro da operação sobe
    }
  },
};