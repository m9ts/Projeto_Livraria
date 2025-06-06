import { Request, Response } from "express";
import { UsuarioService } from "../service/UsuarioService";
import { Usuario } from "../model/Usuario";

export class UsuarioController {
  private usuarioService: UsuarioService;

  constructor() {
    this.usuarioService = new UsuarioService();
  }

  cadastrar(req: Request, res: Response): Response {
    try {
      const { cpf, nome, ativo, categoria_id, curso_id, suspensao } = req.body;

      const novoUsuario = new Usuario(Date.now(), nome, cpf, ativo ?? true, categoria_id, curso_id, suspensao);

      const sucesso = this.usuarioService.cadastrar(novoUsuario);

      if (!sucesso) {
        return res.status(400).json({ mensagem: "Usuário já cadastrado!" });
      }
      return res.status(201).json({ mensagem: "Usuário cadastrado com sucesso!" });
    } catch (error: unknown) {
      const mensagemErro = error instanceof Error ? error.message : "Erro desconhecido.";
      return res.status(500).json({ mensagem: "Erro interno ao cadastrar usuário!", erro: mensagemErro });
    }
  }

  buscarCPF(req: Request, res: Response): Response {
    try {
      const { cpf } = req.params;
      const usuario = this.usuarioService.buscarCPF(cpf);

      if (!usuario) {
        return res.status(404).json({ mensagem: "Usuário não encontrado!" });
      }
      return res.status(200).json(usuario);
    } catch (error: unknown) {
      const mensagemErro = error instanceof Error ? error.message : "Erro desconhecido.";
      return res.status(500).json({ mensagem: "Erro interno ao buscar usuário!", erro: mensagemErro });
    }
  }

  listar(req: Request, res: Response): Response {
    try {
      const usuarios = this.usuarioService.listarTodos();
      return res.status(200).json(usuarios);
    } catch (error: unknown) {
      const mensagemErro = error instanceof Error ? error.message : "Erro desconhecido.";
      return res.status(500).json({ mensagem: "Erro interno ao listar usuários!", erro: mensagemErro });
    }
  }

  atualizar(req: Request, res: Response): Response {
    try {
      const { cpf } = req.params;
      const { nome, ativo, categoria_id, curso_id, suspensao } = req.body;
      const sucesso = this.usuarioService.atualizar(cpf, nome, ativo, categoria_id, curso_id, suspensao);

      if (!sucesso) {
        return res.status(404).json({ mensagem: "Usuário não encontrado!" });
      }
      return res.status(200).json({ mensagem: "Usuário atualizado com sucesso!" });
    } catch (error: unknown) {
      const mensagemErro = error instanceof Error ? error.message : "Erro desconhecido.";
      return res.status(500).json({ mensagem: "Erro interno ao atualizar usuário!", erro: mensagemErro });
    }
  }

  remover(req: Request, res: Response): Response {
    try {
      const { cpf } = req.params;
      const sucesso = this.usuarioService.remover(cpf);

      if (!sucesso) {
        return res.status(404).json({ mensagem: "Usuário não encontrado ou não pode ser removido!" });
      }
      return res.status(200).json({ mensagem: "Usuário removido com sucesso!" });
    } catch (error: unknown) {
      const mensagemErro = error instanceof Error ? error.message : "Erro desconhecido.";
      return res.status(500).json({ mensagem: "Erro interno ao remover usuário!", erro: mensagemErro });
    }
  }
}
