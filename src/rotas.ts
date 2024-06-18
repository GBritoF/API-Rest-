import { Router } from 'express'
import { mensagemInicial, cadastrar, examesAprovadosOuReprovados, editarExame, excluir } from './controladores/exameDeDirecao'
import { verificaCampos } from './intermediarios/verificaEmaxe'

const rotas = Router()

rotas.get('/', mensagemInicial)

rotas.post('/exames', verificaCampos , cadastrar)

rotas.get('/exames', examesAprovadosOuReprovados)

rotas.put('/exames/:id', editarExame)

rotas.delete('/exames/:id', excluir)

export default rotas