export class Emprestimo {
    static proximoId: number = 1;

    id: number;
    cpfUsuario: string;
    codigoExemplar: number;
    dataEmprestimo: Date;
    dataDevolucao?: Date;
    dataEntrega?: Date;
    diasAtraso?: number;
    suspencaoAte?: Date;

    constructor(cpfUsuario: string, codigoExemplar: number){
        this.id = Emprestimo.proximoId++;
        this.cpfUsuario = cpfUsuario;
        this.codigoExemplar = codigoExemplar;
        this.dataEmprestimo = new Date();
    }
}
