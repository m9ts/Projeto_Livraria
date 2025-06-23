import { LivroService } from "../service/LivroService";
import { Request, Response } from "express";

export class LivroController{
    private livroService = new LivroService();

    criarLivro(req: Request, res: Response): void{
        try{
            const livro = this.livroService.AdicionarLivro(req.body);
            res.status(201).json(livro);
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

    listarLivro(req: Request, res: Response): void{
        try{
            const filtros = req.query;
            const livro = this.livroService.listarLivroComFiltro(filtros);
            res.status(201).json(livro);
        }
        catch(error: unknown){
            let message: string = "Não foi possível listar os livros";
            if(error instanceof Error){
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }

    buscarLivro(req: Request, res: Response): void{
        const isbn = req.params.isbn;
        try{
            const livro = this.livroService.buscarLivroPorISBN(isbn);
            res.status(201).json(livro);
        }
        catch(error: unknown){
            let message: string = "Não foi possível retornar o livro";
            if(error instanceof Error){
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }

    atualizarLivro(req: Request, res: Response): void{
        const isbn = req.params.isbn;
        try{
            const livro = this.livroService.atualizarLivro(isbn, req.body);
            res.status(201).json(livro);
        }
        catch(error: unknown){
            let message: string = "Não foi possível atualizar informações do livro";
            if(error instanceof Error){
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }

    removerLivro(req: Request, res: Response): void{
        const isbn = req.params.isbn;
        try{
            const livro = this.livroService.removerLivro(isbn);
            res.status(204).send();
        }
        catch(error: unknown){
            let message: string = "Não foi possível remover livro";
            if(error instanceof Error){
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }
}