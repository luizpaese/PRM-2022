import { Request, Response } from "express";
import { TypeORMError } from "typeorm";
import { Product } from "../entity/Product";

class ProductController {

    public async index(request: Request, response: Response){
        try {
            //buscar todos os registros do banco
            const products = await Product.find();

            return response.json(products)
        } catch (e) {
            const error = e as TypeORMError;
            return response.status(500).json({message: error.message})
        }
    }

    public async create(request: Request, response: Response){
        try {
            //salvo no banco
            const product = await Product.save(request.body);

            return response.status(201).json(product)
        } catch (e) {
            const error = e as TypeORMError;
            return response.status(500).json({message: error.message})
        }
    }

    public async show(request: Request, response: Response){
        try {
            //pego o id enviado por parametro na request
            const {id} = request.params;

            //verifico se existo o parametro id
            if (!id) {
                return response.status(400).json({message: 'Parametro ID nao existe'});
            }

            const found = await Product.findOneBy({id: Number(id)})

            if (!found) {
                return response.status(404).json({message: 'Recurso nao encontrado'});
            }

            return response.json(found)
        } catch (e) {
            const error = e as TypeORMError;
            return response.status(500).json({message: error.message})
        }
    }

    public async update(request: Request, response: Response){
        try {
            //pego o id enviado por parametro na request
            const {id} = request.params;

            //verifico se existo o parametro id
            if (!id) {
                return response.status(400).json({message: 'Parametro ID nao existe'});
            }

            const found = await Product.findOneBy({id: Number(id)})

            if (!found) {
                return response.status(404).json({message: 'Recurso nao encontrado'});
            }

            //atualizo com novos dados
            await Product.update(found.id, request.body);

            const novo = request.body;

            //Altero o ID para o que veio no request
            novo.id = found.id;

            return response.json(novo)
        } catch (e) {
            const error = e as TypeORMError;
            return response.status(500).json({message: error.message})
        }
    }

    public async remove(request: Request, response: Response){
        try {
            //pego o id enviado por parametro na request
            const {id} = request.params;

            //verifico se existo o parametro id
            if (!id) {
                return response.status(400).json({message: 'Parametro ID nao existe'});
            }

            const found = await Product.findOneBy({id: Number(id)})

            if (!found) {
                return response.status(404).json({message: 'Recurso nao encontrado'});
            }

            //remove o registro baseado no id
            await found.remove();

            //retorno estado 204=sem retorno
            return response.status(204).json()
        } catch (e) {
            const error = e as TypeORMError;
            return response.status(500).json({message: error.message})
        }
    }
}

export default new ProductController();