import express from 'express'
import cors from 'cors';
// import router from '';

const app = express();

app.use(cors());
app.use(express.json());

// Rotas

export default app;