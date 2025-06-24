import { Emprestimo } from "../model/Emprestimo";

export class EmprestimoRepository {
    private static instance: EmprestimoRepository;
    private emprestimos: Emprestimo[] = [];

    private constructor() {}

    public static getInstance(): EmprestimoRepository {
        if (!this.instance) {
        this.instance = new EmprestimoRepository();
    }
    return this.instance;
    }

    inserir(emprestimo: Emprestimo): void {
        this.emprestimos.push(emprestimo);
    }

    listarEmprestimos(): Emprestimo[] {
        return this.emprestimos;
    }

    buscarEmprestimoPorId(id: number): Emprestimo | undefined {
        return this.emprestimos.find(e => e.id === id);
    }

    registrarDevolucao(id: number, data: Date): boolean {
        const emprestimo = this.buscarEmprestimoPorId(id);
        if (emprestimo && !emprestimo.dataEntrega) {
            emprestimo.dataEntrega = data;
            return true;
    }
        return false;
    }

    listarPorUsuario(cpf: string): Emprestimo[] {
        return this.emprestimos.filter(e => e.cpfUsuario === cpf);
    }

    emprestimosAbertos(cpf: string): Emprestimo[] {
        return this.emprestimos.filter(e => e.cpfUsuario === cpf && !e.dataEntrega);
    }
}