import { Request, Response } from "express";


let Correios = require('node-correios');
let correios = new Correios();

class FreteController {

    public async calcular(request: Request, response: Response) {
        try {

            const reg = /\D/g
            const req = request.body;
            let cep = req.cep;

            cep = cep.replace(reg, "")

            if (/^(\d{8})$/.test(cep)) {
                let args = {
                    nCdServico: '04510',
                    sCepOrigem: '85506040',
                    sCepDestino: cep,
                    nVlPeso: '1',
                    nCdFormato: 1,
                    nVlComprimento: 30.0,
                    nVlAltura: 3.0,
                    nVlLargura: 15.0,
                    nVlDiametro: 10.0
                }   
                
                const frete = await correios.calcPreco(args)
                const data = {
                    "cepOrigem": "85501200",
                    "cepDestino": cep,
                    "servico": "PAC à vista",
                    "valor": parseFloat(frete[0].Valor.replace(',','.'))
                }
                return response.json(data);
            } else {
                return response.status(400).json({message: 'Erro: CEP inválido'});
            }
            
        } catch (e) {
            return response.status(500).json({message: 'Erro: ' + e});
        }
    }

}

export default new FreteController();