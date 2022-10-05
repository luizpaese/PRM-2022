import { AppDataSource } from './data-source';
import express from 'express';
import cors from 'cors';
import routes from './routes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3301;

app.use(cors());
app.use(express.json());

app.use('/backoffice', routes);

AppDataSource.initialize()
    .then(() => {

        app.listen(PORT, () => {
            console.log(`Service backoffice running in port ${PORT}`);
        })

    })
    .catch(error => {
        console.log('Ops! Ocorreu um erro.');
        console.error(error);
    });


