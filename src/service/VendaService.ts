import { VendaPaes } from "../model/VendaPaes";
import { EstoquePaes } from "../model/EstoquePaes";
import { ModalidadePaes } from "../model/ModalidadePaes";
import { VendaRepository } from "../repository/VendaRepository";
import { ModalidadeService } from "./ModalidadeService";
import { EstoqueService } from "./EstoqueService";

export class VendaService {

    private vendaRepository: VendaRepository;
    private estoqueService: EstoqueService;
    private modalidadeService: ModalidadeService;

    constructor(vendaRepository: VendaRepository, estoqueService: EstoqueService, modalidadeService: ModalidadeService) {
        this.vendaRepository = vendaRepository;
        this.estoqueService = estoqueService;
        this.modalidadeService = modalidadeService;
    }

    public realizarVenda(vendaData: any): VendaPaes{
        this.validarDadosVenda(vendaData);

        const { cpf, itens } = vendaData;
        const itensProcessados = this.processarItens(itens);
        const total = this.calcularTotal(itensProcessados);

        this.atualizarEstoque(itensProcessados);

        const venda = new VendaPaes(cpf, itensProcessados);
        venda.setTotal(total);

        this.vendaRepository.adicionar(venda);

        return venda;
    }

    private validarDadosVenda(vendaData: any): void{
        const { cpf, itens } = vendaData;
        if (!cpf || !itens || !Array.isArray(itens)) {
            throw new Error("Dados inválidos para a venda");
        }
    }

    private processarItens(itens: any[]): {estoquePaesID: number, quantidade: number, nome: string}[] {
        return itens.map(item => {
            this.validarItem(item);
            const estoque = this.buscarEValidarEstoque(item);
            const modalidade = this.buscarModalidade(estoque);
            return {
                estoquePaesID: item.estoquePaesID,
                quantidade: item.quantidade,
                nome: modalidade.getNome()
            };
        });
    }

    private validarItem(item: any): void{
        if (item.quantidade <= 0 || !item.estoquePaesID || !item.quantidade) {
            throw new Error(`Dados inválidos para o item ${item.estoquePaesID}`);
        }
    }

    private buscarEValidarEstoque(item: any): EstoquePaes{
        const estoque = this.estoqueService.buscarPorID(item.estoquePaesID);
        if (!estoque || estoque.getQuantidade() < item.quantidade) {
            throw new Error(`Estoque insuficiente para o item ${item.estoquePaesID}`);
        }
        return estoque;
    }

    private buscarModalidade(estoque: EstoquePaes): ModalidadePaes{
        const modalidade = this.modalidadeService.buscarPorID(estoque.getModalidadeID());
        if (modalidade === undefined) {
            throw new Error(`Modalidade não encontrada para o item ${estoque.getID()}`);
        }
        return modalidade;
    }

    private calcularTotal(itensProcessados: {estoquePaesID: number, quantidade: number}[]): number{
        return itensProcessados.reduce((total, item) => {
            const estoque = this.estoqueService.buscarPorID(item.estoquePaesID);
            return total + (estoque.getPrecoVenda() * item.quantidade);
        }, 0);
    }

    private atualizarEstoque(itensProcessados: {estoquePaesID: number, quantidade: number}[]): void{
        itensProcessados.forEach(item => {
            this.estoqueService.deletarQuantidade({
                id: item.estoquePaesID,
                quantidade: item.quantidade
            });
        });
    }

    public buscar(id: number): VendaPaes | undefined{
        return this.vendaRepository.buscar(id);
    }
}