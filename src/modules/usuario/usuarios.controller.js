import { usuariosService } from "./usuarios.service.js";

export const usuariosController = {
  createUser: async (req, res) => {
    try {
      const result = await usuariosService.criarUsuario(req.body);
      return res.status(201).json({result});
    }
    catch (Error) {
      console.Error;

      return res.status(500).json({Message: "internal server error"})
    }
  },

  getUsers: async (req, res) => {
    try {
      const usuarios = await usuariosService.buscarUsuarios();
      return res.status(200).json({usuarios});
    }
    catch (Error) {
      return res.status(500).json({Message: "internal server error"})
    }
  },

  getUserByID: async (req, res) => {
    try {
      const usuario = await usuariosService.buscarUsuarioPorId(req.params.id);
      return res.status(200).json({usuario: usuario});
    }
    catch (Error) {
      return res.status(500).json({Message: "internal server error"})
    }
  },
}