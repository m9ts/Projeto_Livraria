import { Request, Response } from "express";
import { EmprestimoService } from "../service/EmprestimoService";
import { Emprestimo } from "../model/Emprestimo";

export class EmprestimoController {
    private emprestimoService: EmprestimoService;

    constructor() {
        this.emprestimoService = new EmprestimoService();
    }

    public cadastrar(req: Request, res: Response): void {
        try {
            const { usuario_id, codigo, data_emprestimo } = req.body;

            if (!usuario_id || !codigo || !data_emprestimo) {
                res.status(400).json({ mensagem: "Todos os campos são obrigatórios!" });
                return;
            }

            const dataDevolucao = new Date(data_emprestimo);
            dataDevolucao.setDate(dataDevolucao.getDate() + 15);

            const novoEmprestimo = new Emprestimo(
                Date.now(),
                usuario_id,
                codigo,
                new Date(data_emprestimo),
                dataDevolucao
            );

            const sucesso = this.emprestimoService.cadastrar(novoEmprestimo);
            if (!sucesso) {
                res.status(400).json({ mensagem: "Empréstimo inválido ou usuário não permitido!" });
                return;
            }

            res.status(201).json({ mensagem: "Empréstimo registrado com sucesso!", data_devolucao: dataDevolucao });
        } catch (error) {
            res.status(500).json({ mensagem: "Erro ao cadastrar empréstimo!", erro: error });
        }
    }

    public listar(req: Request, res: Response): void {
        try {
            const emprestimos = this.emprestimoService.listar();

            if (emprestimos.length === 0) {
                res.status(200).json({ mensagem: "Nenhum empréstimo cadastrado no sistema." });
                return;
            }

            res.status(200).json(emprestimos);
        } catch (error) {
            res.status(500).json({ mensagem: "Erro ao listar empréstimos!", erro: error });
        }
    }

    public buscarPorId(req: Request, res: Response): void {
        try {
            const { id } = req.params;
            const emprestimo = this.emprestimoService.buscarPorId(Number(id));

            if (!emprestimo) {
                res.status(404).json({ mensagem: "Empréstimo não encontrado!" });
                return;
            }

            res.status(200).json(emprestimo);
        } catch (error) {
            res.status(500).json({ mensagem: "Erro ao buscar empréstimo!", erro: error });
        }
    }

    public atualizarDataEntrega(req: Request, res: Response): void {
        try {
            const { id } = req.params;
            const { data_entrega } = req.body;

            if (!data_entrega) {
                res.status(400).json({ mensagem: "Data de entrega é obrigatória!" });
                return;
            }

            const sucesso = this.emprestimoService.atualizarDataEntrega(Number(id), new Date(data_entrega));

            if (!sucesso) {
                res.status(404).json({ mensagem: "Empréstimo não encontrado!" });
                return;
            }

            res.status(200).json({ mensagem: "Data de entrega atualizada com sucesso!" });
        } catch (error) {
            res.status(500).json({ mensagem: "Erro ao atualizar data de entrega!", erro: error });
        }
    }

    public remover(req: Request, res: Response): void {
        try {
            const { id } = req.params;
            const sucesso = this.emprestimoService.remover(Number(id));

            if (!sucesso) {
                res.status(404).json({ mensagem: "Empréstimo não encontrado!" });
                return;
            }

            res.status(200).json({ mensagem: "Empréstimo removido com sucesso!" });
        } catch (error) {
            res.status(500).json({ mensagem: "Erro ao remover empréstimo!", erro: error });
        }
    }
}
