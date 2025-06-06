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
        if (!usuario || !usuario.ativo || usuario.suspensao) return false;

        const estoque = this.estoqueService.buscarLivroId(emprestimo.estoque_id);
        if (!estoque || estoque.quantidade <= estoque.quantidade_emprestimo) return false;

        let diasEmprestimo = usuario.categoria_id === 1 ? 40 : usuario.categoria_id === 2 && usuario.curso_id === estoque.livro_id ? 30 : 15;

        const dataDevolucao = new Date();
        dataDevolucao.setDate(dataDevolucao.getDate() + diasEmprestimo);
        emprestimo.data_devolucao = dataDevolucao;

        return this.emprestimoRepository.cadastrar(emprestimo);
    }

    buscarPorId(id: number): Emprestimo | undefined {
        return this.emprestimoRepository.buscarPorId(id);
    }

    buscarUsuarioId(usuario_id: string): Emprestimo[] {
        return this.emprestimoRepository.buscarUsuarioId(usuario_id);
    }

    buscarEstoqueId(estoque_id: number): Emprestimo[] {
        return this.emprestimoRepository.buscarEstoqueId(estoque_id);
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
            }
        }

        return sucesso;
    }

    remover(id: number): boolean {
        return this.emprestimoRepository.remover(id);
    }
}
