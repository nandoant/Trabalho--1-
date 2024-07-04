export class ModalidadePaes{
    private id: number;
    private nome: string;
    private vegano: boolean;

    constructor(nome: string, vegano: boolean){
        this.nome = nome;
        this.vegano = vegano;
        this.id = this.geraId();
    }

    public geraId(): number {
        const random1 = this.randomNum();
        const random2 = this.randomNum();
        const yearLastTwoDigits = new Date().getFullYear().toString().slice(-2);

        return parseInt(random1.toString().padStart(2, '0') + yearLastTwoDigits + random2.toString().padStart(2, '0'));
    }

    private randomNum(){
        return Math.floor(Math.random() * 100);
    }

    public getNome(): string{
        return this.nome;
    }

    public isVegano(): boolean{
        return this.vegano;
    }

    public getID(): number{
        return this.id;
    }

    public setNome(nome: string): void{
        this.nome = nome;
    }

    public setVegano(vegano: boolean): void{
        this.vegano = vegano;
    }
}