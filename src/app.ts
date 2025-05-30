import express from "express";

const app = express();
const PORT = 3090;

app.use(express.json());

//Importar e implementar rotas


app.use("/library/usuarios", );
app.use("/library/livros", );
app.use("/library/estoque", );
app.use("/library/emprestimos", );


app.listen(PORT, () => {console.log(`Servidor ouvindo em http://localhost:${PORT}/library`);
});
