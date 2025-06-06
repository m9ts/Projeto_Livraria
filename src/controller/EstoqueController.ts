import { Request, Response } from "express";
import { EstoqueService } from "../service/EstoqueService";
import { Estoque } from "../model/Estoque";

export class EstoqueController {
  private estoqueService: EstoqueService;

  constructor() {
    this.estoqueService = new EstoqueService();
  }

  cadastrar(req: Request, res: Response): Response {
    try {
      const { livro_id, quantidade, quantidade_emprestimo } = req.body;

      const novoEstoque = new Estoque(Date.now(), livro_id, quantidade, quantidade_emprestimo ?? 0);

      this.estoqueService.cadastrar(novoEstoque);
      return res.status(201).json({ mensagem: "Registro de estoque cadastrado com sucesso!" });
    } catch (error: unknown) {
      const mensagemErro = error instanceof Error ? error.message : "Erro desconhecido.";
      return res.status(500).json({ mensagem: "Erro ao cadastrar estoque!", erro: mensagemErro });
    }
  }

  buscarLivroId(req: Request, res: Response): Response {
    try {
      const { livro_id } = req.params;
      const estoque = this.estoqueService.buscarLivroId(Number(livro_id));

      if (!estoque) {
        return res.status(404).json({ mensagem: "Estoque não encontrado!" });
      }
      return res.status(200).json(estoque);
    } catch (error: unknown) {
      const mensagemErro = error instanceof Error ? error.message : "Erro desconhecido.";
      return res.status(500).json({ mensagem: "Erro ao buscar estoque!", erro: mensagemErro });
    }
  }

  listar(req: Request, res: Response): Response {
    try {
      const estoques = this.estoqueService.listar();
      return res.status(200).json(estoques);
    } catch (error: unknown) {
      const mensagemErro = error instanceof Error ? error.message : "Erro desconhecido.";
      return res.status(500).json({ mensagem: "Erro ao listar estoques!", erro: mensagemErro });
    }
  }

  atualizar(req: Request, res: Response): Response {
    try {
      const { livro_id } = req.params;
      const { quantidade, quantidade_emprestimo } = req.body;
      const sucesso = this.estoqueService.atualizar(Number(livro_id), quantidade, quantidade_emprestimo);

      if (!sucesso) {
        return res.status(404).json({ mensagem: "Estoque não encontrado!" });
      }
      return res.status(200).json({ mensagem: "Estoque atualizado com sucesso!" });
    } catch (error: unknown) {
      const mensagemErro = error instanceof Error ? error.message : "Erro desconhecido.";
      return res.status(500).json({ mensagem: "Erro ao atualizar estoque!", erro: mensagemErro });
    }
  }

  remover(req: Request, res: Response): Response {
    try {
      const { livro_id } = req.params;
      const sucesso = this.estoqueService.remover(Number(livro_id));

      if (!sucesso) {
        return res.status(404).json({ mensagem: "Estoque não encontrado ou não pode ser removido!" });
      }
      return res.status(200).json({ mensagem: "Registro de estoque removido com sucesso!" });
    } catch (error: unknown) {
      const mensagemErro = error instanceof Error ? error.message : "Erro desconhecido.";
      return res.status(500).json({ mensagem: "Erro ao remover estoque!", erro: mensagemErro });
    }
  }
}
