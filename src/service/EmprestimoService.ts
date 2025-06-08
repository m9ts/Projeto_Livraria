import { EmprestimoRepository } from "../repository/EmprestimoRepository";
import { Emprestimo } from "../model/Emprestimo";
import { UsuarioService } from "../service/UsuarioService";
import { EstoqueService } from "../service/EstoqueService";

export class EmprestimoService {
    private emprestimoRepository: EmprestimoRepository;
    private usuarioService: UsuarioService;
    private estoqueService: EstoqueService;

    constructor() {
        this.emprestimoRepository = new EmprestimoRepository();
        this.usuarioService = new UsuarioService();
        this.estoqueService = new EstoqueService();
    }

    cadastrar(emprestimo: Emprestimo): boolean {
        const usuario = this.usuarioService.buscarCPF(emprestimo.usuario_id);
        if (!usuario || !usuario.ativo || (usuario.suspensao && usuario.suspensao > new Date())) {
            console.log("Usuário inválido ou suspenso:", usuario);
            return false;
        }

        const estoque = this.estoqueService.buscarCodigo(emprestimo.codigo);
        if (!estoque || estoque.quantidade <= estoque.quantidade_emprestimo) {
            console.log("Estoque insuficiente:", estoque);
            return false;
        }

        const emprestimosAtuais = this.buscarUsuarioId(emprestimo.usuario_id);

        if (usuario.categoria_id === 1 && emprestimosAtuais.length >= 5) {
            console.log("Limite de empréstimos atingido para professor:", emprestimosAtuais.length);
            return false;
        }

        if (usuario.categoria_id === 2 && emprestimosAtuais.length >= 3) {
            console.log("Limite de empréstimos atingido para aluno:", emprestimosAtuais.length);
            return false;
        }

        let diasEmprestimo = 15;

        if (usuario.categoria_id === 1) {
            diasEmprestimo = 40;
        } else if (usuario.categoria_id === 2 && usuario.curso_id === estoque.codigo) {
            diasEmprestimo = 30;
        }

        const dataDevolucao = new Date();
        dataDevolucao.setDate(dataDevolucao.getDate() + diasEmprestimo);
        emprestimo.data_devolucao = dataDevolucao;

        emprestimo.id = Date.now();

        console.log("Empréstimo cadastrado com sucesso:", JSON.stringify(emprestimo, null, 2));
        return this.emprestimoRepository.cadastrar(emprestimo);
    }

    buscarPorId(id: number): Emprestimo | undefined {
        return this.emprestimoRepository.buscarPorId(id);
    }

    buscarUsuarioId(usuario_id: string): Emprestimo[] {
        return this.emprestimoRepository.buscarUsuarioId(usuario_id);
    }

    buscarCodigo(codigo: number): Emprestimo[] {
        return this.emprestimoRepository.buscarCodigo(codigo);
    }

    listar(): Emprestimo[] {
        return this.emprestimoRepository.listar();
    }

    atualizarDataEntrega(id: number, data_entrega: Date): boolean {
        const emprestimo = this.buscarPorId(id);
        if (!emprestimo) return false;

        const sucesso = this.emprestimoRepository.atualizarDataEntrega(id, data_entrega);

        if (sucesso && emprestimo.atraso_dias) {
            const usuario = this.usuarioService.buscarCPF(emprestimo.usuario_id);
            if (usuario) {
                usuario.suspensao = new Date();
                usuario.suspensao.setDate(usuario.suspensao.getDate() + emprestimo.atraso_dias * 3);

                if ((usuario.suspensao.getTime() - new Date().getTime()) > 60 * 24 * 60 * 60 * 1000) {
                    usuario.ativo = false;
                    console.log("Usuário suspenso por mais de 60 dias e agora está inativo:", usuario);
                }
            }
        }

        return sucesso;
    }

    remover(id: number): boolean {
        const emprestimo = this.buscarPorId(id);
        if (!emprestimo) return false;

        console.log("Removendo empréstimo:", emprestimo);
        return this.emprestimoRepository.remover(id);
    }
}
