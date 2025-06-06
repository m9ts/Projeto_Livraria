import { Request, Response } from "express";
import { EmprestimoService } from "../service/EmprestimoService";
import { Emprestimo } from "../model/Emprestimo";

export class EmprestimoController {
    private emprestimoService: EmprestimoService;

    constructor() {
        this.emprestimoService = new EmprestimoService();
    }

    cadastrar(req: Request, res: Response): Response {
        try {
            const { usuario_id, estoque_id, data_emprestimo } = req.body;

            const dataDevolucao = new Date();
            const novoEmprestimo = new Emprestimo(
                Date.now(),
                usuario_id,
                estoque_id,
                new Date(data_emprestimo),
                dataDevolucao
            );

            const sucesso = this.emprestimoService.cadastrar(novoEmprestimo);
            if (!sucesso) return res.status(400).json({ mensagem: "Empréstimo inválido ou usuário não permitido!" });

            return res.status(201).json({ mensagem: "Empréstimo registrado com sucesso!" });
        } catch (error) {
            return res.status(500).json({ mensagem: "Erro ao cadastrar empréstimo!", erro: error });
        }
    }
}
