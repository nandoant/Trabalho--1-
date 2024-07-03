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

    private validarEstoqueData(ID?: number, modalidadeID?: number, quantidade?: number, precoVenda?: number): void {
        if (ID !== undefined && typeof ID !== "number") {
            throw new Error("ID inválido");
        }
        if (modalidadeID !== undefined && typeof modalidadeID !== "number") {
            throw new Error("ModalidadeID inválido");
        }
        if (quantidade !== undefined && typeof quantidade !== "number") {
            throw new Error("Quantidade inválida");
        }
        if (precoVenda !== undefined && typeof precoVenda !== "number") {
            throw new Error("Preço de Venda inválido");
        }
    }

    public adicionar(estoqueData: any): void {
        const { modalidadeID, quantidade, precoVenda } = estoqueData;
        this.validarEstoqueData(undefined, modalidadeID, quantidade, precoVenda);

        if (this.produtoJaCadastrado(modalidadeID)) {
            throw new Error("Produto já cadastrado!!!");
        }

        if (!this.modalidadeExiste(modalidadeID)) {
            throw new Error("Modalidade não encontrada");
        }

        const novoProduto = new EstoquePaes(modalidadeID, quantidade, precoVenda);
        while (this.estoqueRepository.possui(novoProduto.getID())) {
            novoProduto.geraId();
        }

        this.estoqueRepository.adicionar(novoProduto);
    }


    public buscarTodoEstoque(): EstoquePaes[] {
        return this.estoqueRepository.buscarTodoEstoque().sort((a, b) => b.getPrecoVenda() - a.getPrecoVenda());
    }

    public atualizarQuantidade(estoqueData: any): void {
        const { ID, quantidade } = estoqueData;
        this.validarEstoqueData(ID, undefined, quantidade);

        const produto = this.buscarProdutoPorID(ID);
        this.estoqueRepository.atualizarQuantidade(produto.getID(), quantidade);
    }

    public buscarPorID(id: any): EstoquePaes {
        const idNumber = parseInt(id, 10);
        return this.buscarProdutoPorID(idNumber);
    }

    public deletarQuantidade(estoqueData: any): void {
        const { id, quantidade } = estoqueData;
        this.validarEstoqueData(id, undefined, quantidade);

        const produto = this.buscarProdutoPorID(id);
        this.estoqueRepository.deletarQuantidade(produto.getID(), quantidade);
    }

    public buscarEstoqueIDPorModalidadeID(modalidadeID: number): number | undefined {
        const estoque = this.estoqueRepository.buscarPorModalidadeID(modalidadeID);
        if (estoque === undefined) {
            return undefined;
        }

        return estoque.getID();
    }

    private buscarProdutoPorID(id: number): EstoquePaes {
        const produto = this.estoqueRepository.buscarPorID(id);
        if (!produto) {
            throw new Error("Produto não encontrado");
        }
        return produto;
    }

    private produtoJaCadastrado(modalidadeID: any): boolean {
        const modalidadeIDNumber = parseInt(modalidadeID);
        return this.estoqueRepository.buscarPorModalidadeID(modalidadeIDNumber) !== undefined;
    }

    private modalidadeExiste(modalidadeID: number): boolean {
        return !!this.modalidadeService.buscarPorID(modalidadeID);
    }
}
