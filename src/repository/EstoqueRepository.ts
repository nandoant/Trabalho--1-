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

    public buscarPorModalidadeID(modalidadeID: number): EstoquePaes | undefined{
        return this.estoquePaes.find(estoquePaes => estoquePaes.getModalidadeID() === modalidadeID);
    }

    public atualizarQuantidade(id: number, incrementarQuantidade: number): boolean {
        const produto = this.buscarPorID(id);
        if (produto === undefined) return false;
        
        const indexProduto = this.estoquePaes.indexOf(produto);
        this.estoquePaes[indexProduto].setQuantidade(this.estoquePaes[indexProduto].getQuantidade() + incrementarQuantidade);
        return true;
    }

    public deletarQuantidade(id:number, removerQuantidade: number): boolean {
        const produto = this.buscarPorID(id);
        if (produto === undefined) return false;
        if (produto.getQuantidade() < removerQuantidade) return false;
        
        const indexProduto = this.estoquePaes.indexOf(produto);
        this.estoquePaes[indexProduto].setQuantidade(this.estoquePaes[indexProduto].getQuantidade() - removerQuantidade);
        return true;
    }

    public possui(id: number): boolean{
        return this.estoquePaes.some(estoquePaes => estoquePaes.getID() === id);
    }


}