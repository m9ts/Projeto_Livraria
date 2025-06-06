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

  buscarLivroId(codigo: number): Estoque | undefined {
    return this.estoqueRepository.buscarLivroId(codigo) ?? undefined;
  }

  listar(): Estoque[] {
    return this.estoqueRepository.listar();
  }

  atualizar(codigo: number, quantidade?: number, quantidade_emprestimo?: number): boolean {
    const estoque = this.estoqueRepository.buscarLivroId(codigo);
    if (!estoque) return false;

    return this.estoqueRepository.atualizar(codigo, quantidade, quantidade_emprestimo);
  }

  verificarDisponibilidade(codigo: number): boolean {
    const estoque = this.estoqueRepository.buscarLivroId(codigo);
    return estoque ? estoque.quantidade - estoque.quantidade_emprestimo > 0 : false;
  }

  remover(codigo: number): boolean {
    const estoque = this.estoqueRepository.buscarLivroId(codigo);
    if (!estoque || estoque.quantidade_emprestimo > 0) return false;

    return this.estoqueRepository.remover(codigo);
  }
}
