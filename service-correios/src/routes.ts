import { Router } from 'express';
import FreteController from './controller/FreteController';
import CepController from './controller/CepController';


const routes = Router()


routes.route('/frete')
    .post(FreteController.calcular);


routes.route('/cep')
    .post(CepController.endereco);


export default routes;