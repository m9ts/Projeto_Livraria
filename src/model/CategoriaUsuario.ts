export class CategoriaUsuario {
    static ultimoId: number = 0;

    id: number;
    nome: string;

    constructor(nome: string){
        this.id = this.gerarId();
        this.nome = nome;
    }

    gerarId(): number{
        CategoriaUsuario.ultimoId++;
        return CategoriaUsuario.ultimoId;
    }
}