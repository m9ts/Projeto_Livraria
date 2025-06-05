import { Emprestimo } from "../model/Emprestimo";

export class EmprestimoRepository {
  private emprestimos: Emprestimo[] = [];

  cadastrar(emprestimo: Emprestimo): void {
    this.emprestimos.push(emprestimo);
  }

  buscarUsuarioId(usuario_id: number): Emprestimo | undefined {
    return this.emprestimos.find(emprestimo => emprestimo.usuario_id === usuario_id);
  }

  buscarEstoqueId(estoque_id: number): Emprestimo | undefined {
    return this.emprestimos.find(emprestimo => emprestimo.estoque_id === estoque_id);
  }

  listar(): Emprestimo[] {
    return this.emprestimos;
  }

  atualizarDataEntrega(id: number, data_entrega: Date): boolean {
    const emprestimo = this.emprestimos.find(e => e.id === id);
    if (!emprestimo) return false;

    emprestimo.data_entrega = data_entrega;
    emprestimo.atraso_dias = emprestimo.calcularAtraso(); 

    return true;
  }

  remover(id: number): boolean {
    const index = this.emprestimos.findIndex(e => e.id === id);
    if (index === -1) return false;

    this.emprestimos.splice(index, 1);
    return true;
  }
}
