import { CategoriaLivro } from "../model/CategoriaLivro";

export class CategoriaLivroRepository{
    private static instance: CategoriaLivroRepository;
    private categorias: CategoriaLivro [] = [
        new CategoriaLivro(1, "Romance"),
        new CategoriaLivro(2, "Computação"),
        new CategoriaLivro(3, "Letras"),
        new CategoriaLivro(4, "Gestão")
    ];

    private constructor(){}

    public static getInstance(): CategoriaLivroRepository {
        if(!this.instance){
            this.instance = new CategoriaLivroRepository;
        }
        return this.instance;
    }

    listarCategorias(): CategoriaLivro[]{
            return this.categorias;
    }

    buscarPorId(id: number): CategoriaLivro | undefined{
            return this.categorias.find(cat => cat.id === id);
    }
}