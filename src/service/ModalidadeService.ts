import { ModalidadePaes } from "../model/ModalidadePaes";
import { ModalidadeRepository } from "../repository/ModalidadeRepository";

export class ModalidadeService{
    modalidadeRepository:ModalidadeRepository;

    constructor(modalidadeRepository: ModalidadeRepository){
        this.modalidadeRepository = modalidadeRepository;
    }

    buscarTodas(): ModalidadePaes[]{
        return this.modalidadeRepository.buscarTodas();
    }

    public adicionar(modalidadeData: any): void{
        const {nome, vegano} = modalidadeData;
        if(!nome || vegano === undefined){
            throw new Error("Dados inválidos");
        }

        const modalidadeEncontrada = this.modalidadeRepository.buscarPorNome(nome);
        if(modalidadeEncontrada){
            throw new Error("Modalidade já cadastrada!!!");
        }

        const novaModalidade = new ModalidadePaes(nome, vegano);
        while(this.modalidadeRepository.possui(novaModalidade.getID())){
            novaModalidade.geraId();
        }
        
        this.modalidadeRepository.adicionar(novaModalidade);
    }

    atualizarModalidade(modalidadeData: any): void{
        const {ID, nome, vegano} = modalidadeData;
        if(!ID || !nome || vegano === undefined){
            throw new Error("Dados inválidos");
        }

        const modalidade = this.modalidadeRepository.buscarPorID(ID);
        if(!modalidade){
            throw new Error("Modalidade não encontrada");
        }

        modalidade.setNome(nome);
        modalidade.setVegano(vegano);
        this.modalidadeRepository.atualizar(modalidade);
    }

    deletarModalidade(modalidadeData: any): void{
        const {ID, nome, vegano} = modalidadeData;
        if(!ID || !nome || vegano === undefined){
            throw new Error("Dados inválidos");
        }

        const modalidade = this.modalidadeRepository.buscarPorID(ID);
        if(!modalidade){
            throw new Error("Modalidade não encontrada");
        }

        this.modalidadeRepository.deletar(modalidade);
    }

    buscarPorID(id: any): ModalidadePaes{
        const idNumber = parseInt(id);
        const modalidade = this.modalidadeRepository.buscarPorID(idNumber);
        if(!modalidade){
            throw new Error("Modalidade não encontrada");
        }
        return modalidade;
    }

    buscarIDPorNome(nome: any): number{
        const modalidade = this.modalidadeRepository.buscarPorNome(nome);
        if(!modalidade){
            throw new Error("Modalidade não encontrada");
        }
        return modalidade.getID();
    }


}