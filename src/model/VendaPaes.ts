export class VendaPaes {
    private id: number;
    private cpf: number;
    private itens: {estoquePaesID: number, quantidade: number}[];
    private total: number;

    constructor(cpf: number, itens: {estoquePaesID: number, quantidade: number}[]) {
        this.id = this.gerarID(); 
        this.cpf = cpf;
        this.itens = itens;
        this.total = 0; 
    }

    private gerarID(): number {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000);
        return parseInt(timestamp.toString().slice(-5) + random.toString().padStart(3, '0'));
    }

    public getID(): number {
        return this.id;
    }

    public getCPF(): number {
        return this.cpf;
    }

    public getItens(): {estoquePaesID: number, quantidade: number}[] {
        return this.itens;
    }

    public getTotal(): number {
        return this.total;
    }

    public setID(id: number): void {
        this.id = id;
    }

    public setCPF(cpf: number): void {
        this.cpf = cpf;
    }

    public setItens(itens: {estoquePaesID: number, quantidade: number}[]): void {
        this.itens = itens;
    }

    public setTotal(total: number): void {
        this.total = total;
    }
}

