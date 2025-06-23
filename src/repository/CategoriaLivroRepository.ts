import { CategoriaLivro } from "../model/CategoriaLivro";

export class CategoriaLivroRepository{
    private static instance: CategoriaLivroRepository;
    private CategoriaLivroList: CategoriaLivro[] = [];

    private constructor(){
        this.CategoriaLivroList.push(new CategoriaLivro("Computação"));
        this.CategoriaLivroList.push(new CategoriaLivro("Gestão"));
        this.CategoriaLivroList.push(new CategoriaLivro("Letras"));
        this.CategoriaLivroList.push(new CategoriaLivro("Romance"));
    };

    public static getInstance(): CategoriaLivroRepository{
        if(!this.instance){
            this.instance = new CategoriaLivroRepository();
        }

        return this.instance;
    }

    listarCategoriasLivro(){
        return this.CategoriaLivroList;
    }

    encontrarCategoriaLivro(liv: string){
        return this.CategoriaLivroList.find(livro => livro.nome === liv);
    }
}