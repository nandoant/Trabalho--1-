import { Request, Response } from "express";
import { VendaService } from "../service/VendaService";

export class VendaController {
    private vendaService: VendaService;
    
    constructor(vendaService: VendaService) {
        this.vendaService = vendaService;
    }

    public realizarVenda = (req: Request, res: Response) => {
        try {
            const venda = this.vendaService.realizarVenda(req.body);
            res.status(200).json({
                idVenda: venda.getID(),
                cpf: venda.getCPF(),
                itens: venda.getItens(),
                total: venda.getTotal()
            });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    public buscarVendaPorID = (req: Request, res: Response) => {
        try {
            const id = Number(req.query.id);
            const venda = this.vendaService.buscar(id);
            if (venda) {
                res.status(200).json({
                    idVenda: venda.getID(),
                    cpf: venda.getCPF(),
                    itens: venda.getItens(),
                    total: venda.getTotal()
                });
            } else {
                res.status(404).json({ message: "Venda não encontrada" });
            }
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}