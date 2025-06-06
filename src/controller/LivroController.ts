import { Request, Response } from "express";
import { LivroService } from "../service/LivroService";
import { Livro } from "../model/Livro";

export class LivroController {
  private livroService: LivroService;

  constructor() {
    this.livroService = new LivroService();
  }

  public cadastrar(req: Request, res: Response): void {
    try {
      const { isbn, titulo, autor, editora, edicao, categoria_id } = req.body;

      if (!isbn || !titulo || !autor || !editora || !edicao || !categoria_id) {
        res.status(400).json({ mensagem: "Todos os campos são obrigatórios!" });
        return;
      }

      const novoLivro = new Livro(Date.now(), titulo, autor, editora, edicao, isbn, categoria_id);
      const sucesso = this.livroService.cadastrar(novoLivro);

      if (!sucesso) {
        res.status(400).json({ mensagem: "Livro já cadastrado!" });
        return;
      }

      res.status(201).json({ mensagem: "Livro cadastrado com sucesso!" });
    } catch (error) {
      const mensagemErro = error instanceof Error ? error.message : "Erro desconhecido.";
      res.status(500).json({ mensagem: "Erro ao cadastrar livro!", erro: mensagemErro });
    }
  }

  public buscarISBN(req: Request, res: Response): void {
    try {
      const { isbn } = req.params;

      if (!isbn) {
        res.status(400).json({ mensagem: "O ISBN do livro é obrigatório!" });
        return;
      }

      const livro = this.livroService.buscarISBN(isbn);

      if (!livro) {
        res.status(404).json({ mensagem: "Livro não encontrado!" });
        return;
      }

      res.status(200).json(livro);
    } catch (error) {
      const mensagemErro = error instanceof Error ? error.message : "Erro desconhecido.";
      res.status(500).json({ mensagem: "Erro ao buscar livro!", erro: mensagemErro });
    }
  }

  public listar(req: Request, res: Response): void {
    try {
      const livros = this.livroService.listar();

      if (livros.length === 0) {
        res.status(200).json({ mensagem: "Nenhum livro cadastrado no sistema." });
        return;
      }

      res.status(200).json(livros);
    } catch (error) {
      const mensagemErro = error instanceof Error ? error.message : "Erro desconhecido.";
      res.status(500).json({ mensagem: "Erro ao listar livros!", erro: mensagemErro });
    }
  }

  public atualizar(req: Request, res: Response): void {
    try {
      const { isbn } = req.params;
      const { titulo, autor, editora, edicao, categoria_id } = req.body;

      if (!isbn) {
        res.status(400).json({ mensagem: "O ISBN do livro é obrigatório!" });
        return;
      }

      const sucesso = this.livroService.atualizar(isbn, titulo, autor, editora, edicao, categoria_id);

      if (!sucesso) {
        res.status(404).json({ mensagem: "Livro não encontrado!" });
        return;
      }

      res.status(200).json({ mensagem: "Livro atualizado com sucesso!" });
    } catch (error) {
      const mensagemErro = error instanceof Error ? error.message : "Erro desconhecido.";
      res.status(500).json({ mensagem: "Erro ao atualizar livro!", erro: mensagemErro });
    }
  }

  public remover(req: Request, res: Response): void {
    try {
      const { isbn } = req.params;

      if (!isbn) {
        res.status(400).json({ mensagem: "O ISBN do livro é obrigatório!" });
        return;
      }

      const sucesso = this.livroService.remover(isbn);

      if (!sucesso) {
        res.status(404).json({ mensagem: "Livro não encontrado ou não pode ser removido!" });
        return;
      }

      res.status(200).json({ mensagem: "Livro removido com sucesso!" });
    } catch (error) {
      const mensagemErro = error instanceof Error ? error.message : "Erro desconhecido.";
      res.status(500).json({ mensagem: "Erro ao remover livro!", erro: mensagemErro });
    }
  }
}
