import { NextFunction, Response } from "express"
import { v4 as uuidv4 } from 'uuid';
import { RequestComExame, exame } from "../types";

export const verificaCampos = (req: RequestComExame, res: Response, next: NextFunction) => {
    const { 
        examinador,
        candidato,
        quantidadeEliminatorias,
        quantidadeGraves,
        quantidadeMedias,
        quantidadeLeves 
    } = req.body
    
    let aprovado = true
    
    if(((quantidadeGraves * 3) + (quantidadeMedias * 2) + (quantidadeLeves * 1)) > 3 || quantidadeEliminatorias >= 1) {
        aprovado = false
    } else {
        aprovado = true
    }
    
    const novoExame: exame = {
        id: uuidv4(),
        examinador,
        candidato,
        quantidadeEliminatorias,
        quantidadeGraves,
        quantidadeMedias,
        quantidadeLeves,
        aprovado
    }  


    if(!examinador || !candidato || !String(quantidadeEliminatorias) || !String(quantidadeGraves) || !String(quantidadeMedias) || !String(quantidadeLeves)) {
        return res.status(400).json({
            mensagem: "Preencha todos os campos!"
        })
    }
    
    if(!novoExame) {
        res.status(401)
    }

    req.novoExame = novoExame

    next()
}
