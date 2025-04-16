import express from "express";
import methodOverride from 'method-override';
import ControleProdutos, { produtos } from "./controllers/ControleProdutos.js";
import ControleClientes from "./controllers/ControleClientes.js";



const app = express();


app.use(express.urlencoded({ extended: true })); // ler os forms
app.use(methodOverride('_method')); //inserir e remover -  post e push

app.set("view engine", "ejs");
app.use(express.static('public'));


//Rota Index
app.get("/", (req, res) => {
  res.render("index");
});

// Formulário de novo produto
app.get("/produtos/novo", (req, res) => {
  res.render("novo");
});

// Processar novo produto
app.post("/produtos/novo", (req, res) => {

  const { nome, preco, categoria, imagem } = req.body;

  const produto = {
    nome,
    preco,
    categoria,
    imagem: `/images/${imagem}`, // monta o caminho da imagem baseado no nome informado
  };
  produtos.push(produto);

  res.redirect("/produtos");
});   


//Rota para estoque
app.get("/estoque", (req, res) => {
  res.render("estoque", { produtos });
});


app.put("/estoque/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const produto = produtos.find(p => p.id === id);
  const { operacao, valor } = req.body;

  if (produto) {
    const quantidade = parseInt(valor);
    if (operacao === "entrada") {
      produto.quantidade += quantidade;
    } else if (operacao === "saida") {
      if (produto.quantidade >= quantidade) {
        produto.quantidade -= quantidade;
      }
    }
    res.redirect("/estoque");
  } else {
    res.status(404).send("Produto não encontrado");
  }
});

// Put para atualizar info produto
app.put('/produtos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const produto = produtos.find(p => p.id === id);

  if (produto) {
    produto.nome = req.body.nome;
    produto.Preço = parseFloat(req.body.preco);
    produto.categoria = req.body.categoria;
    res.redirect('/produtos');
  } else {
    res.status(404).send("Produto não encontrado");
  }
});

// Armazenar os pedidos
let pedidos = [];

// Rota para pedidos
app.get("/pedidos", (req, res) => {
  res.render("pedidos", { pedidos, produtos });
});

// Processar pedido
app.post("/pedidos", (req, res) => {
  const { produtoId, quantidade } = req.body;
  const produto = produtos.find(p => p.id == produtoId);
  const quantidadeInt = parseInt(quantidade);
  
  if (produto && quantidadeInt > 0) {
    const valorTotal = produto.Preço * quantidadeInt;

    const novoPedido = {
      numeroPedido: pedidos.length + 1,
      produto: produto.nome,
      quantidade: quantidadeInt,
      valorTotal: valorTotal.toFixed(2),
    };

    pedidos.push(novoPedido);
    res.redirect("/pedidos");
  } else {
    res.status(400).send("Produto ou quantidade inválida");
  }
});




app.use("/produtos", ControleProdutos);
app.use("/clientes", ControleClientes);

app.listen(8080, (error) => {
  if (error) {
    console.log("Ocorreu um erro ao acessar o servidor!" + error);
  } else {
    console.log("Servidor iniciado com sucesso!");
  }
});
