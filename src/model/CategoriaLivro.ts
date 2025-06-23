export class CategoriaLivro{
    static ultimoId: number = 0;

    id: number;
    nome: string;

    constructor(id: number, nome: string){
        this.id = id;
        this.nome = nome;
    }
}