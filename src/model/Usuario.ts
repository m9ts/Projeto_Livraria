export class Usuario {
    constructor(
    public id: number,
    public nome: string,
    public cpf: string,
    public ativo: boolean = true,
    public categoria_id: number,
    public curso_id: number,
    public suspensao?: Date
) {}

isAtivo(): boolean {
    return this.ativo && (!this.suspensao || this.suspensao < new Date());
    }
}