import { Request, Response } from "express";
import { TypeORMError } from "typeorm";
import { Category } from "../entity/Category";

class CategoryController {

    public async index(request: Request, response: Response){
        try {
            //buscar todos os registros do banco
            const categories = await Category.find();

            return response.json(categories)
        } catch (e) {
            const error = e as TypeORMError;
            return response.status(500).json({message: error.message})
        }
    }

    public async create(request: Request, response: Response){
        try {
            //salvo no banco
            const category = await Category.save(request.body);

            return response.status(201).json(category)
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

            const found = await Category.findOneBy({id: Number(id)})

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

            const found = await Category.findOneBy({id: Number(id)})

            if (!found) {
                return response.status(404).json({message: 'Recurso nao encontrado'});
            }

            //atualizo com novos dados
            await Category.update(found.id, request.body);

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

            const found = await Category.findOneBy({id: Number(id)})

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

export default new CategoryController();