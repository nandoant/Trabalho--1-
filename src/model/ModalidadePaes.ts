export class ModalidadePaes{
    private ID: number;
    private nome: string;
    private vegano: boolean;

    constructor(nome: string, vegano: boolean){
        this.nome = nome;
        this.vegano = vegano;
        this.ID = this.geraId();
    }

    private geraId(): number {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000);
        return parseInt(timestamp.toString().slice(-5) + random.toString().padStart(3, '0'));
    }

    public getNome(): string{
        return this.nome;
    }

    public isVegano(): boolean{
        return this.vegano;
    }

    public getID(): number{
        return this.ID;
    }

    public setNome(nome: string): void{
        this.nome = nome;
    }

    public setVegano(vegano: boolean): void{
        this.vegano = vegano;
    }
}