import { UsuarioService } from "../service/UsuarioService";
import { Request, Response } from "express";

export class UsuarioController{
    private usuarioService = new UsuarioService();

    criarUsuario(req: Request, res: Response): void{
        try{
            const usuario = this.usuarioService.cadastrarUsuario(req.body);
            res.status(201).json(usuario);
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

    listarUsuario(req: Request, res: Response): void{
        try{
            const filtros = req.query;
            const usuario = this.usuarioService.listarUsuarioComFiltro(filtros);
            res.status(201).json(usuario);
        }
        catch(error: unknown){
            let message: string = "Não foi possível listar os usuários";
            if(error instanceof Error){
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }

    buscarUsuario(req: Request, res: Response): void{
        const cpf = req.params.cpf;
        try{
            const usuario = this.usuarioService.buscarUsuario(cpf);
            res.status(201).json(usuario);
        }
        catch(error: unknown){
            let message: string = "Não foi possível retornar o usuário";
            if(error instanceof Error){
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }

    atualizarUsuario(req: Request, res: Response): void{
        const cpf = req.params.cpf;
        try{
            const usuario = this.usuarioService.atualizarUsuario(cpf, req.body);
            res.status(201).json(usuario);
        }
        catch(error: unknown){
            let message: string = "Não foi possível atualizar usuário";
            if(error instanceof Error){
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }

    removerUsuario(req: Request, res: Response): void {
    const cpf = req.params.cpf;
    try {
        const mensagem = this.usuarioService.removerUsuario(cpf);
        res.status(200).json({ mensagem });
    } catch (error: unknown) {
        let message: string = "Não foi possível remover usuário";
        if (error instanceof Error) {
            message = error.message;
        }
        res.status(400).json({
            message: message
        });
    }
}

}

