import express from "express";
const router = express.Router();

// Lista de clientes
export const clientes = [
  { id: 1, nome: "João da Silva", cpf: "123.456.789-00", endereco: "Rua A, 123" },
  { id: 2, nome: "Maria Oliveira", cpf: "987.654.321-00", endereco: "Avenida B, 456" },
  { id: 3, nome: "Carlos Souza", cpf: "456.789.123-00", endereco: "Rua C, 789" },
];

// Rota para exibir os clientes
router.get("/", (req, res) => {
  res.render("clientes", { clientes });
});

router.get("/novo", (req, res) => {
  res.render("novoCliente");
});

router.post("/novo", (req, res) => {
  const { nome, cpf, endereco } = req.body;
  const novoCliente = {
    id: clientes.length + 1,
    nome,
    cpf,
    endereco
  };
  clientes.push(novoCliente);
  res.redirect("/clientes");
});

export default router;