import { Request, Response } from "express";
import { LivroService } from "../service/LivroService";
import { Livro } from "../model/Livro";

export class LivroController {
  private livroService: LivroService;

  constructor() {
    this.livroService = new LivroService();
  }

  cadastrar(req: Request, res: Response): Response {
    try {
      const { ISBN, titulo, autor, editora, edicao, categoria_id } = req.body;

      const novoLivro = new Livro(Date.now(), ISBN, titulo, autor, editora, edicao, categoria_id);

      const sucesso = this.livroService.cadastrar(novoLivro);

      if (!sucesso) {
        return res.status(400).json({ mensagem: "Livro já cadastrado!" });
      }
      return res.status(201).json({ mensagem: "Livro cadastrado com sucesso!" });
    } catch (error: unknown) {
      const mensagemErro = error instanceof Error ? error.message : "Erro desconhecido.";
      return res.status(500).json({ mensagem: "Erro ao cadastrar livro!", erro: mensagemErro });
    }
  }

  buscarISBN(req: Request, res: Response): Response {
    try {
      const { ISBN } = req.params;
      const livro = this.livroService.buscarISBN(ISBN);

      if (!livro) {
        return res.status(404).json({ mensagem: "Livro não encontrado!" });
      }
      return res.status(200).json(livro);
    } catch (error: unknown) {
      const mensagemErro = error instanceof Error ? error.message : "Erro desconhecido.";
      return res.status(500).json({ mensagem: "Erro ao buscar livro!", erro: mensagemErro });
    }
  }

  listar(req: Request, res: Response): Response {
    try {
      const livros = this.livroService.listar();
      return res.status(200).json(livros);
    } catch (error: unknown) {
      const mensagemErro = error instanceof Error ? error.message : "Erro desconhecido.";
      return res.status(500).json({ mensagem: "Erro ao listar livros!", erro: mensagemErro });
    }
  }

  atualizar(req: Request, res: Response): Response {
    try {
      const { ISBN } = req.params;
      const { titulo, autor, editora, edicao, categoria_id } = req.body;
      const sucesso = this.livroService.atualizar(ISBN, titulo, autor, editora, edicao, categoria_id);

      if (!sucesso) {
        return res.status(404).json({ mensagem: "Livro não encontrado!" });
      }
      return res.status(200).json({ mensagem: "Livro atualizado com sucesso!" });
    } catch (error: unknown) {
      const mensagemErro = error instanceof Error ? error.message : "Erro desconhecido.";
      return res.status(500).json({ mensagem: "Erro ao atualizar livro!", erro: mensagemErro });
    }
  }

  remover(req: Request, res: Response): Response {
    try {
      const { ISBN } = req.params;
      const sucesso = this.livroService.remover(ISBN);

      if (!sucesso) {
        return res.status(404).json({ mensagem: "Livro não encontrado ou não pode ser removido!" });
      }
      return res.status(200).json({ mensagem: "Livro removido com sucesso!" });
    } catch (error: unknown) {
      const mensagemErro = error instanceof Error ? error.message : "Erro desconhecido.";
      return res.status(500).json({ mensagem: "Erro ao remover livro!", erro: mensagemErro });
    }
  }
}
