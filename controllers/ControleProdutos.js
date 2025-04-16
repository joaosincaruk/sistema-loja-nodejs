import express from "express";
const router = express.Router();

// Tornar a lista acessível externamente
export const produtos = [
  { id: 1, nome: "PlayStation One", Preço: 450, categoria: "Sony", imagem: "psone.png", quantidade: 100 },
  { id: 2, nome: "Playstation 2", Preço: 700, categoria: "Sony", imagem: "ps2.png", quantidade: 100 },
  { id: 3, nome: "Playstation 3", Preço: 850, categoria: "Sony", imagem: "ps3.png", quantidade: 100 },
  { id: 4, nome: "Nintendo 64", Preço: 520, categoria: "Nintendo", imagem: "n64.png", quantidade: 100 },
  { id: 5, nome: "Nintendo Wii", Preço: 400, categoria: "Nintendo", imagem: "wii.png", quantidade: 100 },
];


router.get("/", (req, res) => {
  res.render("produtos", { produtos });
});

export default router;