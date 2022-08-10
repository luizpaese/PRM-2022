import express from 'express';
import cors from 'cors';
import { AppDataSource } from './data-source';

//instnacia o express na const app
const app = express();

//define porta
const PORT = 3300;

app.use(cors());
app.use(express.json());

AppDataSource.initialize().then(() => {

    app.listen(PORT, () => {
        console.log(`App rodando na porta: ${PORT}`);
    })

}).catch(error => {
    console.log(`Sem conexão com DB: ${error}`);
});