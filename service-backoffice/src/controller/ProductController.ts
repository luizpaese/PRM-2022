import { Request, Response } from "express";
import { TypeORMError } from "typeorm";
import { Product } from "../entity/Product";


class ProductController {

    public async index(request: Request, response: Response) {
        try {
            const products = await Product.find();

            return response.json(products);
        } catch (e) {
            const error = e as TypeORMError;
            return response.status(500).json({message: error.message});
        }
    }

    public async create(request: Request, response: Response) {
        try {
            const product = await Product.save(request.body);

            return response.status(201).json(product);
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

            const found = await Product.findOneBy({
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

    public async update(request: Request, response: Response) {
        try {
            const {id} = request.params;

            if (!id) {
                return response.status(400).json({message: 'ID não informado'})
            }

            const found = await Product.findOneBy({
                id: Number(id)
            });

            if (!found) {
                return response.status(404).json({message: 'Não encontrado'})
            }

            await Product.update(found.id, request.body);

            const novo = request.body;

            novo.id = found.id;

            return response.json(novo);
        } catch (e) {
            const error = e as TypeORMError;
            return response.status(500).json({message: error.message});
        }
    }

    public async remove(request: Request, response: Response) {
        try {
            const {id} = request.params;

            if (!id) {
                return response.status(400).json({message: 'ID não informado'})
            }

            const found = await Product.findOneBy({
                id: Number(id)
            });

            if (!found) {
                return response.status(404).json({message: 'Não encontrado'})
            }

            await found.remove();

            return response.status(204).json();
        } catch (e) {
            const error = e as TypeORMError;
            return response.status(500).json({message: error.message});
        }
    }

}

export default new ProductController();