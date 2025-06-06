import { EstoqueRepository } from "../repository/EstoqueRepository";
import { Estoque } from "../model/Estoque";

export class EstoqueService {
  private estoqueRepository: EstoqueRepository;

  constructor() {
    this.estoqueRepository = new EstoqueRepository();
  }

  cadastrar(estoque: Estoque): boolean {
    const existeEstoque = this.estoqueRepository.buscarLivroId(estoque.livro_id);
    if (existeEstoque) return false;

    this.estoqueRepository.cadastrar(estoque);
    return true;
  }

  buscarLivroId(livro_id: number): Estoque | undefined {
    return this.estoqueRepository.buscarLivroId(livro_id) ?? undefined;
}

  listar(): Estoque[] {
    return this.estoqueRepository.listar();
  }

  atualizar(livro_id: number, quantidade?: number, quantidade_emprestimo?: number): boolean {
    const estoque = this.estoqueRepository.buscarLivroId(livro_id);
    if (!estoque) return false;

    return this.estoqueRepository.atualizar(livro_id, quantidade, quantidade_emprestimo);
  }

  verificarDisponibilidade(livro_id: number): boolean {
    const estoque = this.estoqueRepository.buscarLivroId(livro_id);
    return estoque ? estoque.quantidade - estoque.quantidade_emprestimo > 0 : false;
  }

  remover(livro_id: number): boolean {
    const estoque = this.estoqueRepository.buscarLivroId(livro_id);
    if (!estoque || estoque.quantidade_emprestimo > 0) return false;

    return this.estoqueRepository.remover(livro_id);
  }
}
