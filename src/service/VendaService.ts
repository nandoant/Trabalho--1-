import { VendaPaes } from "../model/VendaPaes";
import { VendaRepository } from "../repository/VendaRepository";
import { ModalidadeService } from "./ModalidadeService";
import { EstoqueService } from "./EstoqueService";

export class VendaService {
    constructor(
        private vendaRepository: VendaRepository,
        private estoqueService: EstoqueService,
        private modalidadeService: ModalidadeService
    ) {}

    public realizarVenda(vendaData: any): VendaPaes {
        const { cpf, itens } = vendaData;

        if (!cpf || !itens || !Array.isArray(itens)) {
            throw new Error("Dados inválidos");
        }

        let total = 0;
        let estoqueDatas: { quantidade: number, id: number }[] = [];
        const itensProcessados = itens.map(item => {
            const estoque = this.estoqueService.buscarPorID(item.estoquePaesID);
            if (!estoque || estoque.getQuantidade() < item.quantidade) {
                throw new Error(`Estoque insuficiente para o item ${item.estoquePaesID}`);
            }

            const modalidade = this.modalidadeService.buscarPorID(estoque.getModalidadeID());
            if (!modalidade) {
                throw new Error(`Modalidade não encontrada para o item ${item.estoquePaesID}`);
            }

            total += estoque.getPrecoVenda() * item.quantidade;


            const estoqueData ={ quantidade: item.quantidade, id: estoque.getID()};
            estoqueDatas.push(estoqueData);
    

            return {
                estoquePaesID: item.estoquePaesID,
                quantidade: item.quantidade,
                nome: modalidade.getNome()
            };
        });

        for(let estoque of estoqueDatas){
            this.estoqueService.deletarQuantidade(estoque);
        }

        const venda = new VendaPaes(cpf, itensProcessados);
        venda.setTotal(total);

        this.vendaRepository.adicionar(venda);

        return venda;
    }

    public buscarPorID(id: number): VendaPaes | undefined {
        return this.vendaRepository.buscarPorID(id);
    }
}