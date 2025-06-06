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

            if (!this.emprestimoService.cadastrar(novoEmprestimo)) {
                res.status(400).json({ mensagem: "Empréstimo inválido ou usuário não permitido!" });
                return;
            }

            res.status(201).json({ mensagem: "Empréstimo registrado com sucesso!", data_devolucao: dataDevolucao });
        } catch (error) {
            res.status(500).json({ mensagem: "Erro ao cadastrar empréstimo!", erro: error instanceof Error ? error.message : error });
        }
    }

    public listar(req: Request, res: Response): void {
        try {
            const emprestimos = this.emprestimoService.listar();

            res.status(emprestimos.length === 0 ? 200 : 200).json(
                emprestimos.length === 0 ? { mensagem: "Nenhum empréstimo cadastrado no sistema." } : emprestimos
            );
        } catch (error) {
            res.status(500).json({ mensagem: "Erro ao listar empréstimos!", erro: error instanceof Error ? error.message : error });
        }
    }

    public buscarPorId(req: Request, res: Response): void {
        try {
            const { id } = req.params;
            const emprestimo = this.emprestimoService.buscarPorId(Number(id));

            res.status(emprestimo ? 200 : 404).json(
                emprestimo ? emprestimo : { mensagem: "Empréstimo não encontrado!" }
            );
        } catch (error) {
            res.status(500).json({ mensagem: "Erro ao buscar empréstimo!", erro: error instanceof Error ? error.message : error });
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

            res.status(this.emprestimoService.atualizarDataEntrega(Number(id), new Date(data_entrega)) ? 200 : 404).json(
                this.emprestimoService.atualizarDataEntrega(Number(id), new Date(data_entrega))
                    ? { mensagem: "Data de entrega atualizada com sucesso!" }
                    : { mensagem: "Empréstimo não encontrado!" }
            );
        } catch (error) {
            res.status(500).json({ mensagem: "Erro ao atualizar data de entrega!", erro: error instanceof Error ? error.message : error });
        }
    }

    public remover(req: Request, res: Response): void {
        try {
            const { id } = req.params;

            res.status(this.emprestimoService.remover(Number(id)) ? 200 : 404).json(
                this.emprestimoService.remover(Number(id))
                    ? { mensagem: "Empréstimo removido com sucesso!" }
                    : { mensagem: "Empréstimo não encontrado!" }
            );
        } catch (error) {
            res.status(500).json({ mensagem: "Erro ao remover empréstimo!", erro: error instanceof Error ? error.message : error });
        }
    }
}
