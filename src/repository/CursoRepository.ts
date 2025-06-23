import { Curso } from "../model/Curso";

export class CursoRepository{
    private static instance: CursoRepository;
    private cursos: Curso[] = [
        new Curso(0, "Não se Aplica"),
        new Curso(1, "ADS"),
        new Curso(2, "Pedagogia"),
        new Curso(3, "Administração")
    ];

    private constructor(){}

    public static getInstance(): CursoRepository {
        if(!this.instance){
            this.instance = new CursoRepository;
        }
        return this.instance;
    }

    listarCursos(): Curso[]{
            return this.cursos;
        }
    
        buscarPorId(id: number): Curso | undefined{
            return this.cursos.find(curso => curso.id === id);
        }
    }