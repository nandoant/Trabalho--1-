export class EstoquePaes{
    private ID: number;
    private modalidadeID: number;
    private quantidade: number;
    private precoVenda: number;

    constructor(modalidadeID: number, quantidade: number, precoVenda: number){
        this.modalidadeID = modalidadeID;
        this.quantidade = quantidade;
        this.precoVenda = precoVenda;
        this.ID = this.geraId();
    }

    public geraId(): number {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000);
        return parseInt(timestamp.toString().slice(-5) + random.toString().padStart(3, '0'));
    }

    public getPrecoVenda(): number{
        return this.precoVenda;
    }

    public getQuantidade(): number{
        return this.quantidade;
    }

    public getModalidadeID(): number{
        return this.modalidadeID;
    }

    public getID(): number{
        return this.ID;
    }

    public setPrecoVenda(precoVenda: number): void{
        this.precoVenda = precoVenda;
    }

    public setQuantidade(quantidade: number): void{
        this.quantidade = quantidade;
    }

    public setModalidadeID(modalidadeID: number): void{
        this.modalidadeID = modalidadeID;
    }

}