import { Livro } from "../model/Livro";

export class LivroRepository {
    private livros: Livro[] = [];

    cadastrar(livro: Livro): void {
        this.livros.push(livro);
    }

    buscarISBN(ISBN: string): Livro | undefined {
        return this.livros.find(livro => livro.ISBN === ISBN);
    }

    listar(): Livro[] {
        return this.livros;
    }

    atualizar(ISBN: string, titulo?: string, autor?: string, editora?: string, edicao?: string, categoria_id?: number): boolean {
        const livro = this.buscarISBN(ISBN);
        if (!livro) return false;

        if (titulo !== undefined) livro.titulo = titulo;
        if (autor !== undefined) livro.autor = autor;
        if (editora !== undefined) livro.editora = editora;
        if (edicao !== undefined) livro.edicao = edicao;
        if (categoria_id !== undefined) livro.categoria_id = categoria_id;

        return true;
    }

    remover(ISBN: string): boolean {
        const index = this.livros.findIndex(livro => livro.ISBN === ISBN);
        if (index === -1) return false;

        this.livros.splice(index, 1);
        return true;
    }
}
