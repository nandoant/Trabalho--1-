import express from "express";
import { Inicializador } from "./init/Inicializador";

import { EstoqueRepository } from "./repository/EstoqueRepository";
import { EstoqueService } from "./service/EstoqueService";
import { EstoqueController } from "./controller/EstoqueController";


import { ModalidadeRepository } from "./repository/ModalidadeRepository";
import { ModalidadeService } from "./service/ModalidadeService";
import { ModalidadeController } from "./controller/ModalidadeController";

import { VendaRepository } from "./repository/VendaRepository";
import { VendaService } from "./service/VendaService";
import { VendaController } from "./controller/VendaController";



const app = express();
const PORT = process.env.PORT ?? 3333;
app.use(express.json());


//iniciando os repositorios
const ModalidadePaesRepository = new ModalidadeRepository();
const EstoquePaesRepository = new EstoqueRepository();
const vendaRepository = new VendaRepository();

//iniciando os services
const ModalidadePaesService = new ModalidadeService(ModalidadePaesRepository);
const EstoquePaesService = new EstoqueService(EstoquePaesRepository, ModalidadePaesService);
const vendaService = new VendaService(vendaRepository, EstoquePaesService, ModalidadePaesService);

//iniciando os controllers
const modalidadeController = new ModalidadeController(ModalidadePaesService);
const estoqueController = new EstoqueController(EstoquePaesService);
const vendaController = new VendaController(vendaService);


const inicializador = new Inicializador(ModalidadePaesService, EstoquePaesService, vendaService);
inicializador.start();

function logInfo(){
    console.log(`API em execução no URL: http:localhost:${PORT}`);
}


//api modalidade
app.get("/api/modalidade/todas", (req, res) => modalidadeController.buscarTodasModalidades(req, res));
app.get("/api/modalidade", (req, res) => modalidadeController.buscarModalidadePorID(req, res));
app.post("/api/modalidade", (req, res) => modalidadeController.adicionarModalidade(req, res));
app.put("/api/modalidade", (req, res) => modalidadeController.atualizarModalidade(req, res));
app.delete("/api/modalidade", (req, res) => modalidadeController.deletarModalidade(req, res));

//api estoque
app.get("/api/estoque/todos", (req, res) => estoqueController.buscarTodoEstoque(req,res));
app.get("/api/estoque", (req, res) =>estoqueController.buscarProdutoPorID(req,res));
app.post("/api/estoque", (req, res) => estoqueController.adicionarProduto(req,res));
app.put("/api/estoque", (req, res) => estoqueController.atualizarQuantidade(req,res));
app.delete("/api/estoque", (req, res) => estoqueController.deletarQuantidade(req,res));

///api venda
app.post("/api/venda", (req, res) => vendaController.realizarVenda(req, res));
app.get("/api/venda", (req, res) => vendaController.buscarVendaPorID(req, res));


app.listen(PORT, logInfo);