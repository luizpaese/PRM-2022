import { Request, Response } from "express";


let Correios = require('node-correios');
let correios = new Correios();


class CepController {

    public async endereco(request: Request, response: Response) {
        try {
            const reg = /\D/g
            const req = request.body;
            let cep = req.cep;

            cep = cep.replace(reg, "")

            if (/^(\d{8})$/.test(cep)) {
                const endereco = await correios.consultaCEP({ cep: cep })
                const data = {
                    "cep": cep,
                    "logradouro": endereco.logradouro,
                    "cidade": endereco.localidade,
                    "uf": endereco.uf
                }
                return response.json(data);
            } else {
                return response.status(400).json({message: 'Erro: CEP inválido'});
            }
            
        } catch (e) {
            return response.status(500).json({message: 'Erro' + e});
        }
    }

}

export default new CepController();