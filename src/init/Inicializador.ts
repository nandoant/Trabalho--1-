import { EstoqueService } from "../service/EstoqueService";
import { ModalidadeService } from "../service/ModalidadeService";
import { VendaService } from "../service/VendaService";

export class Inicializador{
    modalidade: ModalidadeService;
    estoque: EstoqueService;
    venda: VendaService;

    constructor(modalidade: ModalidadeService, estoque: EstoqueService, venda: VendaService) {
        this.modalidade = modalidade;
        this.estoque = estoque;
        this.venda = venda;
    }

    public start(){
        this.startModalidades();
        this.startEstoque();
        this.startVendas();
    }

    public startModalidades(){
        this.modalidade.adicionar({ nome: "pao frances", vegano: false });
        this.modalidade.adicionar({ nome: "pao integral", vegano: true });
        this.modalidade.adicionar({ nome: "pao de forma", vegano: false });
        this.modalidade.adicionar({ nome: "pao de tapioca", vegano: true });
    }

    public startEstoque(){
        const idPaoFrances = this.modalidade.buscarIDPorNome("pao frances");
        this.estoque.adicionar({ modalidadeID: idPaoFrances, quantidade: 10, precoVenda: 1.5 });
        const idPaoIntegral = this.modalidade.buscarIDPorNome("pao integral");
        this.estoque.adicionar({ modalidadeID: idPaoIntegral, quantidade: 10, precoVenda: 2.5 });
        const idPaoDeForma = this.modalidade.buscarIDPorNome("pao de forma");
        this.estoque.adicionar({ modalidadeID: idPaoDeForma, quantidade: 10, precoVenda: 3.5 });
        const idPaoDeTapioca = this.modalidade.buscarIDPorNome("pao de tapioca");
        this.estoque.adicionar({ modalidadeID: idPaoDeTapioca, quantidade: 10, precoVenda: 4.5 });
    }

    public startVendas(){
        const PaoFrances = this.estoque.buscarEstoqueID(this.modalidade.buscarIDPorNome("pao frances"));
        const PaoIntegral = this.estoque.buscarEstoqueID(this.modalidade.buscarIDPorNome("pao integral"));
        const PaoDeForma = this.estoque.buscarEstoqueID(this.modalidade.buscarIDPorNome("pao de forma"));
        const PaoDeTapioca = this.estoque.buscarEstoqueID((this.modalidade.buscarIDPorNome("pao de tapioca")));

        this.venda.realizarVenda({ cpf: "12345678901", itens: [{ estoquePaesID: PaoFrances, quantidade: 2 }, { estoquePaesID: PaoIntegral, quantidade: 2 }] });
        this.venda.realizarVenda({ cpf: "12345678902", itens: [{ estoquePaesID: PaoDeForma, quantidade: 2 }, { estoquePaesID: PaoDeTapioca, quantidade: 2 }] });
    }



}