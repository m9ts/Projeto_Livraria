import { CategoriaUsuarioRepository } from "../repository/CategoriaUsuarioRepository";

export class CategoriaUsuarioService{
    categoriaUsuarioRepository = CategoriaUsuarioRepository.getInstance();

    listarCategorias(){
        return this.categoriaUsuarioRepository.listarCategorias();
    }

    buscarPorId(id: number){
        return this.categoriaUsuarioRepository.buscarPorId(id);
    }
}