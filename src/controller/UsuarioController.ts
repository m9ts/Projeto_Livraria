import { Request, Response } from "express";
import { UsuarioService } from "../service/UsuarioService";
import { Usuario } from "../model/Usuario";

export class UsuarioController {
  private usuarioService: UsuarioService;

  constructor() {
    this.usuarioService = new UsuarioService();
  }

  public cadastrar(req: Request, res: Response): void {
    try {
      const { cpf, nome, ativo, categoria_id, curso_id, suspensao } = req.body;

      if (!cpf || !nome || !categoria_id || !curso_id) {
        res.status(400).json({ mensagem: "CPF, nome, categoria e curso são obrigatórios!" });
        return;
      }

      const novoUsuario = new Usuario(Date.now(), nome, cpf, ativo ?? true, categoria_id, curso_id, suspensao);
      const sucesso = this.usuarioService.cadastrar(novoUsuario);

      if (!sucesso) {
        res.status(400).json({ mensagem: "Usuário já cadastrado!" });
        return;
      }

      res.status(201).json({ mensagem: "Usuário cadastrado com sucesso!" });
    } catch (error) {
      const mensagemErro = error instanceof Error ? error.message : "Erro desconhecido.";
      res.status(500).json({ mensagem: "Erro interno ao cadastrar usuário!", erro: mensagemErro });
    }
  }

  public buscarCPF(req: Request, res: Response): void {
    try {
      const { cpf } = req.params;

      if (!cpf) {
        res.status(400).json({ mensagem: "CPF do usuário é obrigatório!" });
        return;
      }

      const usuario = this.usuarioService.buscarCPF(cpf);

      if (!usuario) {
        res.status(404).json({ mensagem: "Usuário não encontrado!" });
        return;
      }

      res.status(200).json(usuario);
    } catch (error) {
      const mensagemErro = error instanceof Error ? error.message : "Erro desconhecido.";
      res.status(500).json({ mensagem: "Erro interno ao buscar usuário!", erro: mensagemErro });
    }
  }

  public listar(req: Request, res: Response): void {
    try {
      const usuarios = this.usuarioService.listarTodos();

      if (usuarios.length === 0) {
        res.status(200).json({ mensagem: "Nenhum usuário cadastrado no sistema." });
        return;
      }

      res.status(200).json(usuarios);
    } catch (error) {
      const mensagemErro = error instanceof Error ? error.message : "Erro desconhecido.";
      res.status(500).json({ mensagem: "Erro interno ao listar usuários!", erro: mensagemErro });
    }
  }

  public atualizar(req: Request, res: Response): void {
    try {
      const { cpf } = req.params;
      const { nome, ativo, categoria_id, curso_id, suspensao } = req.body;

      if (!cpf) {
        res.status(400).json({ mensagem: "CPF do usuário é obrigatório!" });
        return;
      }

      const sucesso = this.usuarioService.atualizar(cpf, nome, ativo, categoria_id, curso_id, suspensao);

      if (!sucesso) {
        res.status(404).json({ mensagem: "Usuário não encontrado!" });
        return;
      }

      res.status(200).json({ mensagem: "Usuário atualizado com sucesso!" });
    } catch (error) {
      const mensagemErro = error instanceof Error ? error.message : "Erro desconhecido.";
      res.status(500).json({ mensagem: "Erro interno ao atualizar usuário!", erro: mensagemErro });
    }
  }

  public remover(req: Request, res: Response): void {
    try {
      const { cpf } = req.params;

      if (!cpf) {
        res.status(400).json({ mensagem: "CPF do usuário é obrigatório!" });
        return;
      }

      const sucesso = this.usuarioService.remover(cpf);

      if (!sucesso) {
        res.status(404).json({ mensagem: "Usuário não encontrado ou não pode ser removido!" });
        return;
      }

      res.status(200).json({ mensagem: "Usuário removido com sucesso!" });
    } catch (error) {
      const mensagemErro = error instanceof Error ? error.message : "Erro desconhecido.";
      res.status(500).json({ mensagem: "Erro interno ao remover usuário!", erro: mensagemErro });
    }
  }
}
