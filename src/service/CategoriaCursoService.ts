import { CategoriaCursoRepository } from "../repository/CategoriaCursoRepository";

export class CategoriaCursoService{
    private categoriaCursoRepository = CategoriaCursoRepository.getInstance();

    listarCursos(){
        return this.categoriaCursoRepository.listarCursos();
    }
}