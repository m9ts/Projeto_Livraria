import { Livro } from "../model/Livro";

type DadosAtualizacaoLivro = {
    titulo?: string;
    autor?: string;
    editora?: string;
    edicao?: string;
    categoriaId?: number;
}

export class LivroRepository {
    private static instance: LivroRepository;
    private livros: Livro[] = [];

    private constructor() {}

    public static getInstance(): LivroRepository {
        if (!this.instance) {
            this.instance = new LivroRepository();
        }
        return this.instance;
    }

    inserirLivro(livro: Livro) {
        this.livros.push(livro);
    }

    buscarLivroPorISBN(isbn: string): Livro | undefined {
        return this.livros.find((livro) => livro.isbn === isbn);
    }

    buscarLivroPorAutorEditoraEdicao(autor: string, editora: string, edicao: string): Livro | undefined{
        return this.livros.find(livro => livro.autor.toLowerCase() === autor.toLowerCase()
        && livro.editora.toLowerCase() === editora.toLowerCase() && livro.edicao === edicao);
    }

    listarLivros(): Livro[] {
        return this.livros;
    }

    atualizarDadosLivro(isbn: string, novosDados: DadosAtualizacaoLivro){
        const livro = this.buscarLivroPorISBN(isbn);
        if(!livro) return undefined;

        if(novosDados.titulo){
            livro.titulo = novosDados.titulo;
        }

        if(novosDados.autor){
            livro.autor = novosDados.autor;
        }

        if(novosDados.editora){
            livro.editora = novosDados.editora;
        }

        if(novosDados.edicao){
            livro.edicao = novosDados.edicao;
        }

        if(novosDados.categoriaId){
            livro.categoriaId = novosDados.categoriaId;
        }

        return livro;
    }

    removerLivro(isbn: string): boolean{
        const index = this.livros.findIndex(l => l.isbn == isbn);
        if(index == -1){
            return false;
        }
        this.livros.splice(index, 1);
        return true;
    }
}