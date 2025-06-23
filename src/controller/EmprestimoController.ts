import { EmprestimoService } from "../service/EmprestimoService";
import { Request, Response } from "express";

export class EmprestimoController{
    private emprestimoService = new EmprestimoService;

    criarEmprestimo(req: Request, res: Response): void{
        try{
            const { cpfUsuario, codigoExemplar } = req.body;
            const emprestimo = this.emprestimoService.registrarEmprestimo(cpfUsuario, codigoExemplar);
            res.status(201).json(emprestimo);
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

    listarEmprestimos(req: Request, res: Response): void{
        try{
            const emprestimo = this.emprestimoService.listarEmprestimos();
            res.status(201).json(emprestimo);
        }
        catch(error: unknown){
            let message: string = "Não foi possível listar empréstimos";
            if(error instanceof Error){
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }

    registrarDevolucao(req: Request, res: Response): void{
        const id = parseInt(req.params.id);
        try{
            const emprestimo = this.emprestimoService.registrarDevolucao(id);
            res.status(201).json(emprestimo);
        }
        catch(error: unknown){
            let message: string = "Não foi possível registrar devolucao";
            if(error instanceof Error){
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }
}