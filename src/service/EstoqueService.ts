import { EstoqueRepository } from "../repository/EstoqueRepository";
import { Estoque } from "../model/Estoque";

export class EstoqueService {
  private estoqueRepository: EstoqueRepository;

  constructor() {
    this.estoqueRepository = new EstoqueRepository();
  }

  cadastrar(estoque: Estoque): void {
    this.estoqueRepository.cadastrar(estoque);
  }

  buscarLivroId(livro_id: number): Estoque | undefined {
    return this.estoqueRepository.buscarLivroId(livro_id);
  }

  listar(): Estoque[] {
    return this.estoqueRepository.listar();
  }

  atualizar(livro_id: number, quantidade?: number, quantidade_emprestimo?: number): boolean {
    return this.estoqueRepository.atualizar(livro_id, quantidade, quantidade_emprestimo);
  }

  remover(livro_id: number): boolean {
    return this.estoqueRepository.remover(livro_id);
  }
}
