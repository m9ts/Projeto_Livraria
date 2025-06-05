import { Estoque } from "../model/Estoque";

export class EstoqueRepository {
  private estoques: Estoque[] = [];

  cadastrar(estoque: Estoque): void {
    this.estoques.push(estoque);
  }

  buscarLivroId(livro_id: number): Estoque | undefined {
    return this.estoques.find(estoque => estoque.livro_id === livro_id);
  }

  listar(): Estoque[] {
    return this.estoques;
  }

  atualizar(livro_id: number, quantidade?: number, quantidade_emprestimo?: number): boolean {
    const estoque = this.buscarLivroId(livro_id);
    if (!estoque) return false;

    if (quantidade !== undefined) estoque.quantidade = quantidade;
    if (quantidade_emprestimo !== undefined) estoque.quantidade_emprestimo = quantidade_emprestimo;

    return true;
  }

  remover(livro_id: number): boolean {
    const index = this.estoques.findIndex(estoque => estoque.livro_id === livro_id);
    if (index === -1) return false;

    this.estoques.splice(index, 1);
    return true;
  }
}
