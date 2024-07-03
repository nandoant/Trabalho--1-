import { ItemVenda } from "../model/ItemVenda";

export class ItemRepository{
    ItemVenda: ItemVenda[] = [];

    public addItem(item: ItemVenda): void{
        this.ItemVenda.push(item);
    }

    public removeItem(id: number): void{
        const index = this.ItemVenda.findIndex(item => item.getEstoquePaesID() === id);
        if(index !== -1){
            this.ItemVenda.splice(index, 1);
        }
    }

    public getItems(): ItemVenda[]{
        return this.ItemVenda;
    }

    public buscarPorID(id: number): ItemVenda | undefined{
        return this.ItemVenda.find(item => item.getEstoquePaesID() === id);
    }

    
}