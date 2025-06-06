export class Estoque {
    constructor(
        public id: number,
        public codigo: number,
        public quantidade: number,
        public quantidade_emprestimo: number = 0
    ){}

    isDisponibilidade(): boolean {
        return this.quantidade > this.quantidade_emprestimo;
    }
}