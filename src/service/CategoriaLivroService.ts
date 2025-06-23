import { CategoriaLivroRepository } from "../repository/CategoriaLivroRepository";

export class CategoriaLivroService{
    private categoriaLivroRepository = CategoriaLivroRepository.getInstance();

    listarCategoriaLivro(){
        return this.categoriaLivroRepository.listarCategoriasLivro();
    }
}