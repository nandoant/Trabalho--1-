import { Request, Response } from "express";
import { EstoqueService } from "../service/EstoqueService";

export class EstoqueController{
    estoqueService: EstoqueService;

    constructor(estoqueService: EstoqueService){
        this.estoqueService = estoqueService;
    }


    public buscarTodos(req: Request, res: Response){
        try{
            res.status(200).json(this.estoqueService.buscarTodos());
        }catch(error:any){
            res.status(400).json({message: error.message});
        }
    }

    public adicionar(req: Request, res: Response){
        try{
            this.estoqueService.adicionar(req.body);
            res.status(201).json({message: "Produto adicionado com sucesso!"});
        }catch(error:any){
            res.status(400).json({message: error.message});
        }
    }

    public atualizarQuantidade(req: Request, res: Response){
        try{
            this.estoqueService.atualizarQuantidade(req.body);
            res.status(200).json({message: "Produto adicionada com sucesso!"});
        }catch(error:any){
            res.status(400).json({message: error.message});
        }
    }


    public deletarQuantidade(req: Request, res: Response){
        try{
            this.estoqueService.deletarQuantidade(req.body);
            res.status(202).json({message: "Quantidade deletada com sucesso!"});
        }catch(error:any){
            res.status(400).json({message: error.message});
        }
    }

    public buscarPorID(req: Request, res: Response){
        try{
            res.status(200).json(this.estoqueService.buscarPorID(req.query.id));
        }catch(error:any){
            res.status(404).json({message: error.message});
        }
    }
}