import { EstoqueService } from "../service/EstoqueService";
import { Request, Response } from "express";

export class EstoqueController{
    private estoqueService = new EstoqueService;

    criarExemplar(req: Request, res: Response): void{
        try{
            const { codigo, livro_isbn } = req.body;
            const estoque = this.estoqueService.cadastrarExemplar(codigo, livro_isbn);
            res.status(201).json(estoque);
        }catch(error: unknown){
            let message: string = "Não foi possível criar o registro";
            if(error instanceof Error){
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }

    listarDisponivel(req: Request, res: Response): void{
        try{
            const estoque = this.estoqueService.listarDisponiveis();
            res.status(201).json(estoque);
        }
        catch(error: unknown){
            let message: string = "Não foi possível listar o estoque disponível";
            if(error instanceof Error){
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }

    buscarExemplar(req: Request, res: Response): void{
        const codigo = parseInt(req.params.codigo);
        try{
            const estoque = this.estoqueService.buscarExemplar(codigo);
            res.status(201).json(estoque);
        }
        catch(error: unknown){
            let message: string = "Não foi possível retornar o estoque";
            if(error instanceof Error){
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }

    atualizarStatus(req: Request, res: Response): void{
        const codigo = parseInt(req.params.codigo);
        try{
            const estoque = this.estoqueService.atualizarStatus(codigo, req.body);
            res.status(201).json(estoque);
        }
        catch(error: unknown){
            let message: string = "Não foi possível atualizar status do estoque";
            if(error instanceof Error){
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }

    RemoverEstoque(req: Request, res: Response): void{
        const codigo = parseInt(req.params.codigo);
        try{
            const estoque = this.estoqueService.removerExemplar(codigo);
            res.status(204).send();
        }
        catch(error: unknown){
            let message: string = "Não foi possível remover estoque";
            if(error instanceof Error){
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }
}