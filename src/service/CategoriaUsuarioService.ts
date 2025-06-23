import { CategoriaUsuario } from "../model/CategoriaUsuario";
import { CategoriaUsuarioRepository } from "../repository/CategoriaUsuarioRepository";

export class CategoriaUsuarioService{
    private categoriaUsuarioRepository = CategoriaUsuarioRepository.getInstance();

    listarCategoria(){
        return this.categoriaUsuarioRepository.listarCategoria();
    }
}