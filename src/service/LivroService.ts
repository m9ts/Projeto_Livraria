import { LivroRepository } from "../repository/LivroRepository";
import { Livro } from "../model/Livro";

export class LivroService {
    private livroRepository: LivroRepository;

    constructor() {
        this.livroRepository = new LivroRepository();
    }

    cadastrar(livro: Livro): boolean {
        if (this.livroRepository.buscarISBN(livro.ISBN)) {
            return false;
        }

        this.livroRepository.cadastrar(livro);
        return true;
    }

    buscarISBN(ISBN: string): Livro | undefined {
        return this.livroRepository.buscarISBN(ISBN);
    }

    listar(): Livro[] {
        return this.livroRepository.listar();
    }

    atualizar(ISBN: string, titulo?: string, autor?: string, editora?: string, edicao?: string, categoria_id?: number): boolean {
        return this.livroRepository.atualizar(ISBN, titulo, autor, editora, edicao, categoria_id);
    }

    remover(ISBN: string): boolean {
        return this.livroRepository.remover(ISBN);
    }
}