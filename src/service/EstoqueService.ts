import { EstoquePaes } from "../model/EstoquePaes";
import { ModalidadeService } from "./ModalidadeService";
import { EstoqueRepository } from "../repository/EstoqueRepository";

export class EstoqueService {
    private estoqueRepository: EstoqueRepository;
    private modalidadeService: ModalidadeService;

    constructor(estoqueRepository: EstoqueRepository, modalidadeService: ModalidadeService) {
        this.estoqueRepository = estoqueRepository;
        this.modalidadeService = modalidadeService;
    }


    public adicionar(estoqueData: any): void {
        const { modalidadeID, quantidade, precoVenda } = estoqueData;
        if(!modalidadeID || !quantidade || !precoVenda) 
            throw new Error("Estoque: Informações faltando! Necessário: modalidadeID, quantidade, precoVenda");

        if (this.produtoJaCadastrado(modalidadeID)) 
            throw new Error(`Estoque: Produto com modalidadeID ${modalidadeID} já cadastrado`);
        if (!this.modalidadeExiste(modalidadeID)) 
            throw new Error(`Estoque: Modalidade com ID ${modalidadeID} não encontrada`);
        

        const novoProduto = new EstoquePaes(modalidadeID, quantidade, precoVenda);
        while (this.estoqueRepository.possui(novoProduto.getID())) {
            novoProduto.geraId();
        }

        this.estoqueRepository.adicionar(novoProduto);
    }

    public buscarTodos(): EstoquePaes[] {
        return this.estoqueRepository.buscarTodoEstoque().sort((a, b) => b.getPrecoVenda() - a.getPrecoVenda());
    }

    public atualizarQuantidade(estoqueData: any): void {
        const { id, quantidade } = estoqueData;

        if (quantidade < 0) 
            throw new Error("Estoque: Quantidade a ser atualizada não pode ser negativa");

        const sucesso = this.estoqueRepository.atualizarQuantidade(id, quantidade);
        if (!sucesso) throw new Error(`Estoque: Produto com ID ${id} não encontrado`);
    }

    public buscarPorID(id: any): EstoquePaes {
        const idNumber = parseInt(id, 10);
        const produto = this.estoqueRepository.buscarPorID(idNumber);
        if (!produto) throw new Error(`Estoque: Produto com ID ${id} não encontrado`);
        
        return produto;
    }

    public deletarQuantidade(estoqueData: any): void {
        const { id, quantidade} = estoqueData;

        if(quantidade < 0) throw new Error("Estoque: Quantidade a ser removida não pode ser negativa");

        const produto = this.estoqueRepository.buscarPorID(id);
        if(produto === undefined) 
            throw new Error(`Estoque: Produto com ID ${id} não encontrado`);
        else if(produto.getQuantidade() < quantidade) 
            throw new Error(`Estoque: Produto com ID ${id} não possui quantidade suficiente`);

        this.estoqueRepository.deletarQuantidade(id, quantidade);
    }

    public buscarEstoqueID(modalidadeID: number): number | undefined {
        const estoque = this.estoqueRepository.buscarPorModalidadeID(modalidadeID);
        return estoque?.getID();
    }

    private produtoJaCadastrado(modalidadeID: any): boolean {
        const modalidadeIDNumber = parseInt(modalidadeID);
        return this.estoqueRepository.buscarPorModalidadeID(modalidadeIDNumber) !== undefined;
    }

    private modalidadeExiste(modalidadeID: number): boolean {
        return this.modalidadeService.buscarPorID(modalidadeID) === undefined;
    }
}
