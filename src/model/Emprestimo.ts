export class Emprestimo {
    constructor(
        public id: number,
        public usuario_id: number,
        public estoque_id: number,
        public data_emprestimo: Date,
        public data_devolucao: Date,
        public data_entrega?: Date,
        public atraso_dias?: number
    ){}

    calcularAtraso(): number {
        if (!this.data_entrega) return 0;

        const diffEmMs = this.data_entrega.getTime() - this.data_devolucao.getTime();
        const atraso_dias = diffEmMs / (1000 * 60 * 60 * 24);

        return atraso_dias < 0 ? 0 : atraso_dias; // se < 0 = 0 | se > 0 = atraso_dias
    }
}