import { Request, Response } from "express";
import { EstoqueService } from "../service/EstoqueService";

export class EstoqueController{
    estoqueService: EstoqueService;

    constructor(estoqueService: EstoqueService){
        this.estoqueService = estoqueService;
    }


    buscarTodoEstoque(req: Request, res: Response){
        try{
            res.status(200).json(this.estoqueService.buscarTodoEstoque());
        }catch(error:any){
            res.status(400).json({message: error.message});
        }
    }

    adicionarProduto(req: Request, res: Response){
        try{
            this.estoqueService.adicionar(req.body);
            res.status(201).json({message: "Produto adicionado com sucesso!"});
        }catch(error:any){
            res.status(400).json({message: error.message});
        }
    }

    atualizarQuantidade(req: Request, res: Response){
        try{
            this.estoqueService.atualizarQuantidade(req.body);
            res.status(200).json({message: "Produto adicionada com sucesso!"});
        }catch(error:any){
            res.status(400).json({message: error.message});
        }
    }

    deletarQuantidade(req: Request, res: Response){
        try{
            this.estoqueService.deletarQuantidade(req.body);
            res.status(202).json({message: "Quantidade deletada com sucesso!"});
        }catch(error:any){
            res.status(400).json({message: error.message});
        }
    }

    buscarProdutoPorID(req: Request, res: Response){
        try{
            res.status(200).json(this.estoqueService.buscarPorID(req.query.id));
        }catch(error:any){
            res.status(400).json({message: error.message});
        }
    }
}