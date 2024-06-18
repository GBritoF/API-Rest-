import { Request, Response } from "express"
import bancoDeDados from "../bancoDeDados";
import { RequestComExame, exame } from "../types";

export const mensagemInicial = (req: Request, res: Response) => {
    return res.status(200).json({
        mensagem: "API de exames de direção"
    })
}

export const cadastrar = (req: RequestComExame, res: Response)  => {

    const { novoExame } = req

    bancoDeDados.exames.push(novoExame as exame)

    return res.status(201).json(novoExame)
}

export const examesAprovadosOuReprovados = (req: RequestComExame, res: Response) => {
    if(!bancoDeDados.exames) {
        return res.status(401)
    }

    const { aprovado } = req.query

    if (aprovado === "true" || aprovado === "false") {
        const aprovadoBoolean = (aprovado === "true");
        const aprovadoOuReprovado = bancoDeDados.exames.filter(item => item.aprovado === aprovadoBoolean);
        return res.status(201).json(aprovadoOuReprovado);
    } else {
        return res.status(201).json(bancoDeDados.exames);
    }
}

export const editarExame = (req: RequestComExame, res: Response) => {
    const { id } = req.params

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

    const exame = bancoDeDados.exames.find((item) => {
        return item.id === String(id)
    })

    if(!exame) {
        return res.status(404).json({
            mensagem: "Exame não encontrado!"
        })
    } else if(!examinador || !candidato || !String(quantidadeEliminatorias) || !String(quantidadeGraves) || !String(quantidadeMedias) || !String(quantidadeLeves)) {
        return res.status(404).json({
            mensagem: "Preencha todos os campos!"
        })
    }

    exame.examinador = examinador
    exame.candidato = candidato
    exame.quantidadeEliminatorias = quantidadeEliminatorias
    exame.quantidadeGraves = quantidadeGraves
    exame.quantidadeMedias = quantidadeMedias
    exame.quantidadeLeves = quantidadeLeves
    exame.aprovado = aprovado

    res.status(204).send()
}

export const excluir = (req: RequestComExame, res: Response) => {
    const { id } = req.params

    const exameIndice = bancoDeDados.exames.findIndex((item) => {
        return item.id === String(id)
    })

    if(exameIndice === -1) {
        return res.status(404).json({
            mensagem: "Exame não encontrado!"
        })
    }

    bancoDeDados.exames.splice(exameIndice, 1)

    res.status(204).send()
}   