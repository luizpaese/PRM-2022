import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';

//carrego as variaveis de ambiente da aplicacao
dotenv.config();

//instnacia o express na const app
const app = express();

//define porta
const PORT = process.env.PORT || 3302;

app.use(cors());
app.use(express.json());

//importa as rotas
app.use('/account', routes);


app.listen(PORT, () => {
    console.log(`Service Account running in port: ${PORT}`);
})