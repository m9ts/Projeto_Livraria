import { EstoqueRepository } from "../repository/EstoqueRepository";
import { Estoque } from "../model/Estoque";

export class EstoqueService {
  private static instancia: EstoqueService;
  private estoqueRepository: EstoqueRepository;

  private constructor() {
    this.estoqueRepository = EstoqueRepository.getInstancia();
  }

  static getInstancia(): EstoqueService {
    if (!EstoqueService.instancia) {
      EstoqueService.instancia = new EstoqueService();
    }
    return EstoqueService.instancia;
  }

  cadastrar(estoque: Estoque): boolean {
    if (this.estoqueRepository.buscarCodigo(estoque.codigo)) {
      return false;
    }

    this.estoqueRepository.cadastrar(estoque);
    return true;
  }

  buscarCodigo(codigo: number): Estoque | undefined {
    return this.estoqueRepository.buscarCodigo(codigo);
  }

  listar(): Estoque[] {
    return this.estoqueRepository.listar();
  }

  atualizar(codigo: number, quantidade?: number, quantidade_emprestimo?: number): boolean {
    return this.estoqueRepository.atualizar(codigo, quantidade, quantidade_emprestimo);
  }

  verificarDisponibilidade(codigo: number): boolean {
    const estoque = this.estoqueRepository.buscarCodigo(codigo);
    return estoque ? estoque.quantidade - estoque.quantidade_emprestimo > 0 : false;
  }

  remover(codigo: number): boolean {
    return this.estoqueRepository.remover(codigo);
  }
}
