import { EstoquePaes } from "../model/EstoquePaes";

export class EstoqueRepository{
    private estoquePaes: EstoquePaes[] = [];

    public adicionar(estoquePaes: EstoquePaes): void{
        this.estoquePaes.push(estoquePaes);
    }

    public buscarTodoEstoque(): EstoquePaes[]{
        return this.estoquePaes;
    }

    public buscarPorID(id: number): EstoquePaes | undefined{
        return this.estoquePaes.find(estoquePaes => estoquePaes.getID() === id);
    }

    public atualizarQuantidade(id: number, incrementarQuantidade: number): void{
        const produto = this.buscarPorID(id);
        if(produto === undefined){
            throw new Error("Estoque não encontrado para atualização");
        }

        if(incrementarQuantidade < 0){
            throw new Error("Quantidade a ser atualizada não pode ser negativa");
        }

        const indexProduto = this.estoquePaes.indexOf(produto);
        this.estoquePaes[indexProduto].setQuantidade(this.estoquePaes[indexProduto].getQuantidade() + incrementarQuantidade);
    }

    public deletarQuantidade(id:number, removerQuantidade: number): void{
        const produto = this.buscarPorID(id);
        if(produto === undefined){
            throw new Error("Estoque não encontrado para remoção");
        }

        if(removerQuantidade < 0){
            throw new Error("Quantidade a ser removida não pode ser negativa");
        }

        if(produto.getQuantidade() < removerQuantidade){
            throw new Error("Quantidade a ser removida é maior que a quantidade em estoque");
        }

        const indexProduto = this.estoquePaes.indexOf(produto);
        this.estoquePaes[indexProduto].setQuantidade(this.estoquePaes[indexProduto].getQuantidade() - removerQuantidade);
    }

    public buscarPorModalidadeID(modalidadeID: number): EstoquePaes | undefined{
        return this.estoquePaes.find(estoquePaes => estoquePaes.getModalidadeID() === modalidadeID);
    }


}