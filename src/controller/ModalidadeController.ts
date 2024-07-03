import { Request, Response } from "express";
import { ModalidadeService } from "../service/ModalidadeService";

export class ModalidadeController{
    modalidadeService: ModalidadeService;

    constructor(modalidadeService: ModalidadeService){
        this.modalidadeService = modalidadeService;
    }


    public buscarTodasModalidades(req: Request, res: Response){
        try{
            res.status(200).json(this.modalidadeService.buscarTodas());
        }catch(error:any){
            res.status(400).json({message: error.message});
        }
    }

    adicionarModalidade(req: Request, res: Response){
        try{
            this.modalidadeService.adicionar(req.body);
            res.status(201).json({message: "Modalidade adicionada com sucesso!"});
        }catch(error:any){
            res.status(400).json({message: error.message});
        }
    }

    public atualizarModalidade(req: Request, res: Response){
        try{
            this.modalidadeService.atualizarModalidade(req.body);
            res.status(200).json({message: "Modalidade atualizada com sucesso!"});
        }catch(error:any){
            res.status(400).json({message: error.message});
        }
    }

    deletarModalidade(req: Request, res: Response){
        try{
            this.modalidadeService.deletarModalidade(req.body);
            res.status(202).json({message: "Modalidade deletada com sucesso!"});
        }catch(error:any){
            res.status(400).json({message: error.message});
        }
    }

    buscarModalidadePorID(req: Request, res: Response){
        try{
            res.status(200).json(this.modalidadeService.buscarPorID(req.query.id));
        }catch(error:any){
            res.status(400).json({message: error.message});
        }
    }
}
