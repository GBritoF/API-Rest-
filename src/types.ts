import { Request } from "express"

export interface exame {
        id: string,
        examinador: string,
        candidato: string,
        quantidadeEliminatorias: number,
        quantidadeGraves: number,
        quantidadeMedias: number,
        quantidadeLeves: number,
        aprovado: boolean
}

export interface RequestComExame extends Request {
    novoExame?: exame
}   