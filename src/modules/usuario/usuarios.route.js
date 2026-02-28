import { Router } from "express";
import { usuariosController } from "./usuarios.controller.js";

const router = Router();

router.get("/", usuariosController.getUsers);
router.get("/:id", usuariosController.getUserByID);
router.post("/", usuariosController.createUser);

export default router;