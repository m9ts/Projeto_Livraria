import express from "express";
import { UsuarioController } from "./controller/UsuarioController";
import { LivroController } from "./controller/LivroController";
import { EstoqueController } from "./controller/EstoqueController";
import { EmprestimoController } from "./controller/EmprestimoController";

const app = express();
const PORT = 3090;

app.use(express.json());

const usuarioController = new UsuarioController();
const livroController = new LivroController();
const estoqueController = new EstoqueController();
const emprestimoController = new EmprestimoController();

app.post("/library/usuarios", usuarioController.cadastrar.bind(usuarioController));
app.get("/library/usuarios", usuarioController.listar.bind(usuarioController));
app.get("/library/usuarios/:cpf", usuarioController.buscarCPF.bind(usuarioController));
app.put("/library/usuarios/:cpf", usuarioController.atualizar.bind(usuarioController));
app.delete("/library/usuarios/:cpf", usuarioController.remover.bind(usuarioController));

app.post("/library/livros", livroController.cadastrar.bind(livroController));
app.get("/library/livros", livroController.listar.bind(livroController));
app.get("/library/livros/:isbn", livroController.buscarISBN.bind(livroController));
app.put("/library/livros/:isbn", livroController.atualizar.bind(livroController));
app.delete("/library/livros/:isbn", livroController.remover.bind(livroController));

app.post("/library/estoque", estoqueController.cadastrar.bind(estoqueController));
app.get("/library/estoque", estoqueController.listar.bind(estoqueController));
app.get("/library/estoque/:codigo", estoqueController.buscarCodigo.bind(estoqueController));
app.put("/library/estoque/:codigo", estoqueController.atualizar.bind(estoqueController));
app.delete("/library/estoque/:codigo", estoqueController.remover.bind(estoqueController));

app.post("/library/emprestimos", emprestimoController.cadastrar.bind(emprestimoController));
app.get("/library/emprestimos", emprestimoController.listar.bind(emprestimoController));
app.get("/library/emprestimos/:id", emprestimoController.buscarPorId.bind(emprestimoController));
app.put("/library/emprestimos/:id/devolucao", emprestimoController.atualizarDataEntrega.bind(emprestimoController));
app.delete("/library/emprestimos/:id", emprestimoController.remover.bind(emprestimoController));

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}/library`));
