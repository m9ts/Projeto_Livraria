import { Estoque } from "../model/Estoque";
import { EstoqueRepository } from "../repository/EstoqueRepository";
import { LivroRepository } from "../repository/LivroRepository";

export class EstoqueService{
    estoqueRepository: EstoqueRepository = EstoqueRepository.getInstance();
    livroRepository: LivroRepository = LivroRepository.getInstance();

    cadastrarExemplar(codigo: number, livro_isbn: string){
        if(!codigo || !livro_isbn){
            throw new Error("ISBN e código do livro é obrigatório!");
        }

        const livro = this.livroRepository.buscarLivroPorISBN(livro_isbn);
        if(!livro){
            throw new Error("Livro não encontrado.");
        }

        const novoExemplar = new Estoque(codigo, livro_isbn, 1, 0);
        const existente = this.estoqueRepository.buscarPorCodigo(novoExemplar.codigo);
        if(existente){
            throw new Error("Código já utilizado. Tente novamente.");
        }
        this.estoqueRepository.inserirExemplar(novoExemplar);
        return novoExemplar;
    }

    listarDisponiveis(): Estoque[] {
        return this.estoqueRepository.listarEstoque().filter(e => e.status === "disponivel");
    }

    buscarExemplar(codigo: number): Estoque {
        const exemplar = this.estoqueRepository.buscarPorCodigo(codigo);
        if(!exemplar){
            throw new Error("Exemplar não encontrado.");
        }
        return exemplar;
    }

    atualizarStatus(codigo: number, status: "disponivel" | "emprestado"): Estoque {
        const exemplar = this.buscarExemplar(codigo);
        if(exemplar.status === status){
            return exemplar;
        }

        exemplar.status = status;
        exemplar.quantidade_emprestada = status === "emprestado" ? 1 : 0;
        return exemplar;
    }

    removerExemplar(codigo: number): void {
        const exemplar = this.buscarExemplar(codigo);
        if(exemplar.status === "emprestado"){
            throw new Error("Não é possível remover um exemplar emprestado.");
        }

        const sucesso = this.estoqueRepository.remover(codigo);
        if(!sucesso){
            throw new Error("Erro ao remover exemplar.");
        }
    }
}