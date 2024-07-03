export class ItemVenda{
    private estoquePaesID: number;
    private quantidade: number;

    constructor(estoquePaesID: number, quantidade: number){ 
        this.estoquePaesID = estoquePaesID;
        this.quantidade = quantidade;
    }

    public getEstoquePaesID(): number{
        return this.estoquePaesID;
    }

    public getQuantidade(): number{
        return this.quantidade;
    }

    public setQuantidade(quantidade: number): void{
        this.quantidade = quantidade;
    }
}