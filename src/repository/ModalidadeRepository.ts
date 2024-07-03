import { ModalidadePaes } from "../model/ModalidadePaes";

export class ModalidadeRepository{
    private modalidadePaes: ModalidadePaes[] = [];

    public buscarTodas(): ModalidadePaes[]{
        return this.modalidadePaes;
    }

    public adicionar(modalidadePaes: ModalidadePaes): void{
        this.modalidadePaes.push(modalidadePaes);
    }

    public atualizar(modalidadePaes: ModalidadePaes): void{
        const index = this.modalidadePaes.indexOf(modalidadePaes);
        if(index !== -1){
            this.modalidadePaes[index] = modalidadePaes;
        }else{
            throw new Error("Modalidade não encontrada para atualização");
        }
    }

    public deletar(modalidadePaes: ModalidadePaes): void{
        const index = this.modalidadePaes.indexOf(modalidadePaes);
        if(index !== -1){
            this.modalidadePaes.splice(index, 1);
        }
        else{
            throw new Error("Modalidade não encontrada para exclusão");
        }
    }

    public buscarPorID(id: number): ModalidadePaes | undefined{
        return this.modalidadePaes.find(modalidadePaes => modalidadePaes.getID() === id);
    }

    public buscarPorNome(nome: string): ModalidadePaes | undefined{
        return this.modalidadePaes.find(modalidadePaes => modalidadePaes.getNome() === nome);
    }

    public possui(id: number): boolean{
        return this.modalidadePaes.some(modalidadePaes => modalidadePaes.getID() === id);
    }
}