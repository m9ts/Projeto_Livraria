import { Usuario } from "../model/Usuario";

export class UsuarioRepository {
  private usuarios: Usuario[] = [];

  cadastrar(usuario: Usuario): void {
    this.usuarios.push(usuario);
  }

  buscarCPF(cpf: string): Usuario | undefined {
    return this.usuarios.find(user => user.cpf === cpf);
  }

  listarTodos(): Usuario[] {
    return this.usuarios;
  }

  atualizar(cpf: string, nome?: string, ativo?: boolean, categoria_id?: number, curso_id?: number, suspensao?: Date): boolean {
    const usuario = this.buscarCPF(cpf);
    if (!usuario) return false;

  
    if (nome !== undefined) usuario.nome = nome;
    if (ativo !== undefined) usuario.ativo = ativo;
    if (categoria_id !== undefined) usuario.categoria_id = categoria_id;
    if (curso_id !== undefined) usuario.curso_id = curso_id;
    if (suspensao !== undefined) usuario.suspensao = suspensao;

    return true;
  }

  remover(cpf: string): boolean {
    const index = this.usuarios.findIndex(user => user.cpf === cpf);
    if (index === -1) return false;

    this.usuarios.splice(index, 1);
    return true;
  }
}
