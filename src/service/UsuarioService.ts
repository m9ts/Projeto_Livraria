import { UsuarioRepository } from "../repository/UsuarioRepository";
import { Usuario } from "../model/Usuario";

export class UsuarioService {
  private usuarioRepository: UsuarioRepository;

  constructor() {
    this.usuarioRepository = new UsuarioRepository();
  }

  cadastrar(usuario: Usuario): boolean {
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
