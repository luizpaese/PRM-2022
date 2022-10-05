import { Request, Response } from "express";
import { TypeORMError } from "typeorm";
import { Order } from "../entity/Order";


class OrderController {

    public async index(request: Request, response: Response) {
        try {
            const orders = await Order.find();

            return response.json(orders);
        } catch (e) {
            const error = e as TypeORMError;
            return response.status(500).json({message: error.message});
        }
    }

    public async create(request: Request, response: Response) {
        try {
            const order = await Order.save(request.body);

            return response.status(201).json(order);
        } catch (e) {
            const error = e as TypeORMError;
            return response.status(500).json({message: error.message});
        }
    }

    public async show(request: Request, response: Response) {
        try {
            const {id} = request.params;

            if (!id) {
                return response.status(400).json({message: 'ID não informado'})
            }

            const found = await Order.findOneBy({
                id: Number(id)
            });

            if (!found) {
                return response.status(404).json({message: 'Não encontrado'})
            }

            return response.json(found);
        } catch (e) {
            const error = e as TypeORMError;
            return response.status(500).json({message: error.message});
        }
    }

    public async cancel(request: Request, response: Response) {
        try {
            const {id} = request.params;

            if (!id) {
                return response.status(400).json({message: 'ID não informado'})
            }

            const found = await Order.findOneBy({id: Number(id)});

            if (!found) {
                return response.status(404).json({message: 'Não encontrado'})
            }

            const novo = request.body;

            //Atribui a data atual para o canceledDate
            novo.canceledDate = new Date();

            await Order.update(found.id, request.body);

            novo.id = found.id;

            return response.json(novo);
        } catch (e) {
            const error = e as TypeORMError;
            return response.status(500).json({message: error.message});
        }
    }

}

export default new OrderController();