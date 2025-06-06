import { Estoque } from "../model/Estoque";

export class EstoqueRepository {
  private estoques: Estoque[] = [];

  cadastrar(estoque: Estoque): void {
    this.estoques.push(estoque);
  }

  buscarCodigo(codigo: number): Estoque | undefined {
    return this.estoques.find(estoque => estoque.codigo === codigo);
  }

  listar(): Estoque[] {
    return this.estoques;
  }

  atualizar(codigo: number, quantidade?: number, quantidade_emprestimo?: number): boolean {
    const estoque = this.buscarCodigo(codigo);
    if (!estoque) return false;

    if (quantidade !== undefined) estoque.quantidade = quantidade;
    if (quantidade_emprestimo !== undefined) estoque.quantidade_emprestimo = quantidade_emprestimo;

    return true;
  }

  remover(codigo: number): boolean {
    const index = this.estoques.findIndex(estoque => estoque.codigo === codigo);
    if (index === -1) return false;

    this.estoques.splice(index, 1);
    return true;
  }
}
