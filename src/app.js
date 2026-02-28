import express from 'express'
import cors from 'cors';
import usuariosRouter from './modules/usuario/usuarios.route.js'

const app = express();

app.use(cors());
app.use(express.json());

// Rotas
const usersRoute = usuariosRouter;
app.use("/usuarios", usersRoute);

export default app;