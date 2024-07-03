import { VendaPaes } from "../model/VendaPaes";

export class VendaRepository {
    private vendas: VendaPaes[] = [];

    public adicionar(venda: VendaPaes): void {
        this.vendas.push(venda);
    }

    public buscarPorID(id: number): VendaPaes | undefined {
        return this.vendas.find(venda => venda.getID() === id);
    }
}