import { Request, Response } from "express";
import { ModalidadeService } from "../service/ModalidadeService";

export class ModalidadeController{
    modalidadeService: ModalidadeService;

    constructor(modalidadeService: ModalidadeService){
        this.modalidadeService = modalidadeService;
    }

    public buscarTodas(req: Request, res: Response){
        try{
            res.status(200).json(this.modalidadeService.buscarTodas());
        }catch(error:any){
            res.status(400).json({message: error.message});
        }
    }

    public adicionar(req: Request, res: Response){
        try{
            this.modalidadeService.adicionar(req.body);
            res.status(201).json({message: "Modalidade adicionada com sucesso!"});
        }catch(error:any){
            res.status(400).json({message: error.message});
        }
    }

    public atualizar(req: Request, res: Response){
        try{
            this.modalidadeService.atualizar(req.body);
            res.status(200).json({message: "Modalidade atualizada com sucesso!"});
        }catch(error:any){
            res.status(400).json({message: error.message});
        }
    }

    public deletar(req: Request, res: Response){
        try{
            this.modalidadeService.deletar(req.body);
            res.status(202).json({message: "Modalidade deletada com sucesso!"});
        }catch(error:any){
            res.status(400).json({message: error.message});
        }
    }

    public buscarPorID(req: Request, res: Response){
        try{
            res.status(200).json(this.modalidadeService.buscarPorID(req.query.id));
        }catch(error:any){
            res.status(400).json({message: error.message});
        }
    }
}