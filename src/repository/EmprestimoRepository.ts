import { Emprestimo } from "../model/Emprestimo";

export class EmprestimoRepository {
    private emprestimos: Emprestimo[] = [];

    cadastrar(emprestimo: Emprestimo): boolean {
        for (const e of this.emprestimos) {
            if (e.usuario_id === emprestimo.usuario_id && e.codigo === emprestimo.codigo && !e.data_entrega) {
                return false; 
            }
        }

        this.emprestimos.push(emprestimo);
        return true;
    }

    buscarPorId(id: number): Emprestimo | undefined {
        for (const e of this.emprestimos) {
            if (e.id === id) {
                return e;
            }
        }
        return undefined;
    }

    buscarUsuarioId(usuario_id: string): Emprestimo[] {
        const resultado: Emprestimo[] = [];
        for (const e of this.emprestimos) {
            if (e.usuario_id === usuario_id) {
                resultado.push(e);
            }
        }
        return resultado;
    }

    buscarCodigo(codigo: number): Emprestimo[] {
        const resultado: Emprestimo[] = [];
        for (const e of this.emprestimos) {
            if (e.codigo === codigo) {
                resultado.push(e);
            }
        }
        return resultado;
    }

    listar(): Emprestimo[] {
        return this.emprestimos;
    }

    atualizarDataEntrega(id: number, data_entrega: Date): boolean {
        const emprestimo = this.buscarPorId(id);
        if (!emprestimo) return false;

        emprestimo.data_entrega = data_entrega;
        emprestimo.atraso_dias = emprestimo.calcularAtraso();

        return true;
    }

    remover(id: number): boolean {
        for (let i = 0; i < this.emprestimos.length; i++) {
            if (this.emprestimos[i].id === id) {
                this.emprestimos.splice(i, 1);
                return true;
            }
        }
        return false;
    }
}
