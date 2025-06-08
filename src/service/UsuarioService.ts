import { UsuarioRepository } from "../repository/UsuarioRepository";
import { Usuario } from "../model/Usuario";

export class UsuarioService {
  private static instancia: UsuarioService;
  private usuarioRepository: UsuarioRepository;

  private constructor() {
    this.usuarioRepository = UsuarioRepository.getInstancia(); 
  }

  static getInstancia(): UsuarioService {
    if (!UsuarioService.instancia) {
      UsuarioService.instancia = new UsuarioService();
    }
    return UsuarioService.instancia;
  }

  cadastrar(usuario: Usuario): boolean {
    if (usuario.cpf.length !== 11 || isNaN(Number(usuario.cpf))) {
      return false;
    }
    if (this.usuarioRepository.buscarCPF(usuario.cpf)) {
      return false;
    }

    this.usuarioRepository.cadastrar(usuario);
    return true;
  }

  buscarCPF(cpf: string): Usuario | undefined {
    return this.usuarioRepository.buscarCPF(cpf);
  }

  listarTodos(): Usuario[] {
    return this.usuarioRepository.listarTodos();
  }

  atualizar(cpf: string, nome?: string, ativo?: boolean, categoria_id?: number, curso_id?: number, suspensao?: Date): boolean {
    return this.usuarioRepository.atualizar(cpf, nome, ativo, categoria_id, curso_id, suspensao);
  }

  remover(cpf: string): boolean {
    return this.usuarioRepository.remover(cpf);
  }
}
