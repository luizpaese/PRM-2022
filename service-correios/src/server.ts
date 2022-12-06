import express from 'express';
import cors from 'cors';
import routes from './routes';


const app = express();

const PORT = 3305
const _PREFIX = '/correios/consulta'

app.use(cors())
app.use(express.json())

app.use(_PREFIX, routes)

app.listen(PORT, () => {
    console.log(`Service CEP running in port ${PORT}`);
});