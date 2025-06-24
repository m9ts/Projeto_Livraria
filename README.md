# 📚 API de Gestão de Biblioteca Acadêmica

**Este projeto é uma API desenvolvida em TypeScript com Express.js** que realiza a gestão completa de uma biblioteca acadêmica, seguindo a arquitetura **MVC (Model-View-Controller)**.

Foi construída como parte da avaliação da disciplina de Programação Web do Curso Superior de Tecnologia em Análise e Desenvolvimento de Sistemas no **Instituto Federal de São Paulo - Câmpus Boituva**.

---

## 🎯 Objetivo

A API permite realizar o controle de **usuários, livros, exemplares (estoque) e empréstimos**, aplicando rigorosamente as regras de negócio de uma biblioteca acadêmica.

---

## ⚙️ Tecnologias utilizadas

- Node.js + Express.js  
- TypeScript  
- Arquitetura MVC (Model-View-Controller)  
- Persistência em memória (arrays)  
- Git + GitHub  

---

## 🧱 Funcionalidades

### 👤 Usuários
- Cadastro com validação de CPF único  
- Associação com curso e categoria (aluno, professor, bibliotecário)  
- Controle de status: ativo, suspenso e inativo  
- Suspensão automática por atraso  

### 📖 Livros
- Cadastro com ISBN único  
- Verificação de combinação única (autor, editora, edição)  
- Associação com categoria temática  

### 📦 Estoque
- Cadastro de exemplares por código único  
- Controle de disponibilidade e quantidade emprestada  

### 🔄 Empréstimos
- Regras de prazo e limite por categoria:
  - Professores: até 5 livros por 40 dias  
  - Alunos: até 3 livros por 15 dias (ou 30 se o livro for da área do curso)  
- Validação de suspensões e status do usuário  
- Registro de devolução com cálculo automático de atraso e suspensão  

---

## 🔁 Endpoints principais

**Base URL:** `http://localhost:3090/library`

- `POST /usuarios` – Cadastra um novo usuário  
- `POST /livros` – Adiciona um novo livro  
- `POST /estoque` – Registra um novo exemplar  
- `POST /emprestimos` – Realiza um novo empréstimo  
- `PUT /emprestimos/:id/devolucao` – Registra a devolução  
- Endpoints `GET` para listagem e consulta de dados  

---
