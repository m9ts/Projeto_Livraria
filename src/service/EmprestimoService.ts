import { EmprestimoRepository } from "../repository/EmprestimoRepository";
import { Emprestimo } from "../model/Emprestimo";

export class EmprestimoService {
  private emprestimoRepository: EmprestimoRepository;

  constructor() {
    this.emprestimoRepository = new EmprestimoRepository();
  }

  cadastrar(emprestimo: Emprestimo): void {
    this.emprestimoRepository.cadastrar(emprestimo);
  }

  buscarUsuarioId(usuario_id: number): Emprestimo | undefined {
    return this.emprestimoRepository.buscarUsuarioId(usuario_id);
  }

  buscarEstoqueId(estoque_id: number): Emprestimo | undefined {
    return this.emprestimoRepository.buscarEstoqueId(estoque_id);
  }

  listar(): Emprestimo[] {
    return this.emprestimoRepository.listar();
  }

  atualizarDataEntrega(id: number, data_entrega: Date): boolean {
    return this.emprestimoRepository.atualizarDataEntrega(id, data_entrega);
  }

  remover(id: number): boolean {
    return this.emprestimoRepository.remover(id);
  }
}
