import { CursoRepository } from "../repository/CategoriaCursoRepository";

export class CursoService{
    private CursoRepository = CursoRepository.getInstance();

    listarCursos(){
        return this.CursoRepository.listarCursos();
    }
}