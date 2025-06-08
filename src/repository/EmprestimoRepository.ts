import { Emprestimo } from "../model/Emprestimo";

export class EmprestimoRepository {
    private emprestimos: Emprestimo[] = [];

    cadastrar(emprestimo: Emprestimo): boolean {
        for (const e of this.emprestimos) {
            if (e.usuario_id === emprestimo.usuario_id && e.codigo === emprestimo.codigo && !e.data_entrega) {
                return false;
            }
        }

        emprestimo.id = Date.now();
        this.emprestimos.push(emprestimo);
        return true;
    }

    buscarPorId(id: number): Emprestimo | undefined {
        return this.emprestimos.find(e => e.id === id);
    }

    buscarUsuarioId(usuario_id: string): Emprestimo[] {
        return this.emprestimos.filter(e => e.usuario_id === usuario_id);
    }

    buscarCodigo(codigo: number): Emprestimo[] {
        return this.emprestimos.filter(e => e.codigo === codigo);
    }

    listar(): Emprestimo[] {
        return this.emprestimos;
    }

    atualizarDataEntrega(id: number, data_entrega: Date): boolean {
        const emprestimo = this.buscarPorId(id);
        if (!emprestimo) return false;

        emprestimo.data_entrega = data_entrega;
        if (emprestimo.data_devolucao && data_entrega > emprestimo.data_devolucao) {
            const atraso = (data_entrega.getTime() - emprestimo.data_devolucao.getTime()) / (1000 * 60 * 60 * 24);
            emprestimo.atraso_dias = atraso;
        }

        return true;
    }

    remover(id: number): boolean {
        const index = this.emprestimos.findIndex(e => e.id === id);
        if (index === -1) return false;

        this.emprestimos.splice(index, 1);
        return true;
    }
}
