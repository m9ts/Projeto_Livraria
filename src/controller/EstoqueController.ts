import { Request, Response } from "express";
import { EstoqueService } from "../service/EstoqueService";
import { Estoque } from "../model/Estoque";

export class EstoqueController {
  private estoqueService: EstoqueService;

  constructor() {
    this.estoqueService = new EstoqueService();
  }

  public cadastrar(req: Request, res: Response): void {
    try {
      const { livro_id, quantidade, quantidade_emprestimo } = req.body;

      if (!livro_id || !quantidade) {
        res.status(400).json({ mensagem: "Livro ID e quantidade são obrigatórios!" });
        return;
      }

      const novoEstoque = new Estoque(Date.now(), livro_id, quantidade, quantidade_emprestimo ?? 0);
      this.estoqueService.cadastrar(novoEstoque);

      res.status(201).json({ mensagem: "Registro de estoque cadastrado com sucesso!" });
    } catch (error) {
      const mensagemErro = error instanceof Error ? error.message : "Erro desconhecido.";
      res.status(500).json({ mensagem: "Erro ao cadastrar estoque!", erro: mensagemErro });
    }
  }

  public buscarLivroId(req: Request, res: Response): void {
    try {
      const { livro_id } = req.params;

      if (!livro_id) {
        res.status(400).json({ mensagem: "Livro ID é obrigatório!" });
        return;
      }

      const estoque = this.estoqueService.buscarLivroId(Number(livro_id));

      if (!estoque) {
        res.status(404).json({ mensagem: "Estoque não encontrado!" });
        return;
      }

      res.status(200).json(estoque);
    } catch (error) {
      const mensagemErro = error instanceof Error ? error.message : "Erro desconhecido.";
      res.status(500).json({ mensagem: "Erro ao buscar estoque!", erro: mensagemErro });
    }
  }

  public listar(req: Request, res: Response): void {
    try {
      const estoques = this.estoqueService.listar();

      if (estoques.length === 0) {
        res.status(200).json({ mensagem: "Nenhum registro de estoque cadastrado no sistema." });
        return;
      }

      res.status(200).json(estoques);
    } catch (error) {
      const mensagemErro = error instanceof Error ? error.message : "Erro desconhecido.";
      res.status(500).json({ mensagem: "Erro ao listar estoques!", erro: mensagemErro });
    }
  }

  public atualizar(req: Request, res: Response): void {
    try {
      const { livro_id } = req.params;
      const { quantidade, quantidade_emprestimo } = req.body;

      if (!livro_id) {
        res.status(400).json({ mensagem: "Livro ID é obrigatório!" });
        return;
      }

      const sucesso = this.estoqueService.atualizar(Number(livro_id), quantidade, quantidade_emprestimo);

      if (!sucesso) {
        res.status(404).json({ mensagem: "Estoque não encontrado!" });
        return;
      }

      res.status(200).json({ mensagem: "Estoque atualizado com sucesso!" });
    } catch (error) {
      const mensagemErro = error instanceof Error ? error.message : "Erro desconhecido.";
      res.status(500).json({ mensagem: "Erro ao atualizar estoque!", erro: mensagemErro });
    }
  }

  public remover(req: Request, res: Response): void {
    try {
      const { livro_id } = req.params;

      if (!livro_id) {
        res.status(400).json({ mensagem: "Livro ID é obrigatório!" });
        return;
      }

      const sucesso = this.estoqueService.remover(Number(livro_id));

      if (!sucesso) {
        res.status(404).json({ mensagem: "Estoque não encontrado ou não pode ser removido!" });
        return;
      }

      res.status(200).json({ mensagem: "Registro de estoque removido com sucesso!" });
    } catch (error) {
      const mensagemErro = error instanceof Error ? error.message : "Erro desconhecido.";
      res.status(500).json({ mensagem: "Erro ao remover estoque!", erro: mensagemErro });
    }
  }
}
