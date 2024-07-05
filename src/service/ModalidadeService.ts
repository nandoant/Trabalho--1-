import { ModalidadePaes } from "../model/ModalidadePaes";
import { ModalidadeRepository } from "../repository/ModalidadeRepository";

export class ModalidadeService{
    modalidadeRepository:ModalidadeRepository;

    constructor(modalidadeRepository: ModalidadeRepository){
        this.modalidadeRepository = modalidadeRepository;
    }

    public buscarTodas(): ModalidadePaes[]{
        return this.modalidadeRepository.buscarTodas();
    }

    public adicionar(modalidadeData: any): void{
        const {nome, vegano} = modalidadeData;

        const modalidadeEncontrada = this.modalidadeRepository.buscarPorNome(nome);
        if(modalidadeEncontrada) throw new Error("Modalidade: Modalidade já cadastrada!!!");
        

        const novaModalidade = new ModalidadePaes(nome, vegano);
        while(this.modalidadeRepository.possui(novaModalidade.getID())){
            novaModalidade.geraId();
        }
        
        this.modalidadeRepository.adicionar(novaModalidade);
    }

    public atualizar(modalidadeData: any): void{
        const {id, nome, vegano} = modalidadeData;
        if(!id ||!nome || vegano === undefined) throw new Error("Modalidade: Informações faltando! Necessário: id, nome, vegano");

        const modalidade = this.buscarPorID(id);

        if(modalidade === undefined) 
            throw new Error(`Modalidade: Modalidade com ID ${id} não encontrada`);
        if(modalidade.getNome() !== nome) 
            throw new Error("Modalidade: Nome da modalidade não pode ser alterado");
        
        modalidade.setVegano(vegano);
        this.modalidadeRepository.atualizar(modalidade);
    }

    public deletar(modalidadeData: any): void{
        const {id, nome, vegano} = modalidadeData;
        if(!id ||!nome || vegano === undefined) throw new Error("Modalidade: Informações faltando! Necessário: id, nome, vegano");

        const modalidade = this.buscarPorID(id);
        if(modalidade === undefined) 
            throw new Error(`Modalidade: Modalidade com ID ${id} não encontrada`);
        
        const sucesso = this.modalidadeRepository.deletar(modalidade);
        if(!sucesso) throw new Error(`Modalidade: Modalidade com ID ${id} não encontrada`);
    }

    public buscarPorID(id: any): ModalidadePaes | undefined{
        const idNumber = parseInt(id, 10);
        let modalidade = this.modalidadeRepository.buscarPorID(idNumber);
        
        return modalidade;
    }

    public buscarIDPorNome(nome: any): number{
        const modalidade = this.modalidadeRepository.buscarPorNome(nome);
        if(!modalidade) throw new Error("Modalidade não encontrada");
        
        return modalidade.getID();
    }


}