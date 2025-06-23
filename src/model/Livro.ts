export class Livro {
    static proximoId: number = 0;

    id: number;
    isbn: string;
    titulo: string;
    autor: string;
    editora: string;
    edicao: string;
    categoriaId: number;

    constructor(id: number, isbn: string, titulo: string, autor: string, editora: string, edicao: string, categoriaId: number){
        this.id = Livro.proximoId++;
        this.isbn = isbn;
        this.titulo = titulo;
        this.autor = autor;
        this.editora = editora;
        this.edicao = edicao;
        this.categoriaId = categoriaId;
    }
}