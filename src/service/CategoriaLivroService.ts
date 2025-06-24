import { CategoriaLivroRepository } from "../repository/CategoriaLivroRepository";

export class CategoriaLivroService{
    categoriaLivroRepository = CategoriaLivroRepository.getInstance();

    listarCategorias(){
        return this.categoriaLivroRepository.listarCategorias();
    }

    buscarPorId(id: number){
        return this.categoriaLivroRepository.buscarPorId(id);
    }
    
}