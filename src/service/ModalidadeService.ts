import { ModalidadePaes } from "../model/ModalidadePaes";
import { ModalidadeRepository } from "../repository/ModalidadeRepository";

export class ModalidadeService{
    modalidadeRepository:ModalidadeRepository;

    constructor(modalidadeRepository: ModalidadeRepository){
        this.modalidadeRepository = modalidadeRepository;
    }

    private validarDados(id?: number, nome?: string, vegano?: boolean): void {
        if (id !== undefined && (!id || typeof id !== "number")) throw new Error("ID inválido");
        if(!nome || typeof nome !== "string") throw new Error("Nome inválido");
        if(vegano === undefined || typeof vegano !== "boolean") throw new Error("Vegano inválido");
    }

    public buscarTodas(): ModalidadePaes[]{
        return this.modalidadeRepository.buscarTodas();
    }

    public adicionar(modalidadeData: any): void{
        const {nome, vegano} = modalidadeData;
        this.validarDados(undefined, nome, vegano);

        const modalidadeEncontrada = this.modalidadeRepository.buscarPorNome(nome);
        if(modalidadeEncontrada) throw new Error("Modalidade já cadastrada!!!");
        

        const novaModalidade = new ModalidadePaes(nome, vegano);
        while(this.modalidadeRepository.possui(novaModalidade.getID())){
            novaModalidade.geraId();
        }
        
        this.modalidadeRepository.adicionar(novaModalidade);
    }

    public atualizar(modalidadeData: any): void{
        const {id, nome, vegano} = modalidadeData;
        this.validarDados(id, nome, vegano);

        const modalidade = this.buscarPorID(id);
        if(modalidade.getNome() !== nome) throw new Error("Nome da modalidade não pode ser alterado");
        
        modalidade.setVegano(vegano);
        this.modalidadeRepository.atualizar(modalidade);
    }

    public deletar(modalidadeData: any): void{
        const {id, nome, vegano} = modalidadeData;
        this.validarDados(id, nome, vegano);

        const modalidade = this.buscarPorID(id);
        if(modalidade.getNome() !== nome || modalidade.isVegano() !== vegano) throw new Error("Dados da modalidade não conferem");
        
        this.modalidadeRepository.deletar(modalidade);
    }

    public buscarPorID(id: any): ModalidadePaes{
        const idNumber = parseInt(id);
        const modalidade = this.modalidadeRepository.buscarPorID(idNumber);
        if(!modalidade) throw new Error("Modalidade não encontrada");
        
        return modalidade;
    }

    public buscarIDPorNome(nome: any): number{
        const modalidade = this.modalidadeRepository.buscarPorNome(nome);
        if(!modalidade) throw new Error("Modalidade não encontrada");
        
        return modalidade.getID();
    }


}