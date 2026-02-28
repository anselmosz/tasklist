import { usuariosService } from "./usuarios.service.js";

export const usuariosController = {
  createUser: async (req, res) => {
    try {
      const resultado = await usuariosService.criarUsuario(req.body);
      return res.status(201).json({resultado});
    }
    catch (Error) {
      console.Error;

      return res.status(500).json({Message: "internal server error"});
    }
  },

  getUsers: async (req, res) => {
    try {
      const usuarios = await usuariosService.buscarUsuarios();
      return res.status(200).json({usuarios});
    }
    catch (Error) {
      return res.status(500).json({Message: "internal server error"});
    }
  },

  getUserByID: async (req, res) => {
    try {
      const usuario = await usuariosService.buscarUsuarioPorId(req.params.id);
      return res.status(200).json({usuario: usuario});
    }
    catch (Error) {
      return res.status(500).json({Message: "internal server error"});
    }
  },

  updateUserData: async (req, res) => {
    try {
      const resultado = await usuariosService.atualizarDadosDoUsuario(req.params.id, req.body);
      if (resultado.sucesso == true) {
        return res.status(200).json({message: "dados do usuário atualizados", dados: resultado})
      }
      else if (!resultado.encontrado){
        return res.status(404).json({message: "User not found"});
      }
      else {
        return res.status(400).json({message: "error"});
      }
    }
    catch (Error) {
      return res.status(500).json({message: "internal server error", erro: Error});
    }
  },
}