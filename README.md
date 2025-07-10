# Aplicação Web de Streaming de Música

[![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)](https://github.com/LeonardoAlmeidaPereira/ServicosWeb)

Aplicação Web completa (full-stack) desenvolvida em Node.js com Express e TypeScript. O projeto renderiza o frontend no servidor (Server-Side Rendering) usando a template engine Liquid e simula um serviço de streaming de música, permitindo que usuários gerenciem suas próprias playlists. A arquitetura implementa autenticação e autorização baseadas em sessões e cookies.

## Funcionalidades

- **Autenticação de Usuários:** Sistema completo de registro e login com sessões, senhas criptografadas e cookies.
- **Interface Web:** Páginas renderizadas no servidor para todas as operações de usuário, como login, registro e gerenciamento de playlists.
- **Controle de Acesso:** Perfis de `USER` e `ADMIN` com regras de autorização distintas para acesso às páginas.
- **Gerenciamento de Usuários:** Operações de CRUD para usuários, com interface restrita a administradores.
- **Gerenciamento de Playlists:** Usuários autenticados podem criar, listar, ver detalhes, atualizar e deletar suas próprias playlists através da interface web.

## Tecnologias Utilizadas

- **Backend:** Node.js, Express
- **Linguagem:** TypeScript
- **Renderização:** LiquidJS (Server-Side Rendering)
- **Banco de Dados:** SQLite com Prisma ORM
- **Autenticação:** Sessões (`express-session`)
- **Validação:** Zod
- **Ferramentas:** Um navegador web para usar a aplicação.

## Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina:
- [Node.js](https://nodejs.org/en/) (versão LTS recomendada)
- [Git](https://git-scm.com/)
- Um gerenciador de pacotes como [NPM](https://www.npmjs.com/) (já vem com o Node.js)

## Como Rodar o Projeto

Siga os passos abaixo para executar a aplicação localmente:

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/LeonardoAlmeidaPereira/ServicosWeb.git](https://github.com/LeonardoAlmeidaPereira/ServicosWeb.git)
    cd ServicosWeb
    ```

2.  **Selecione a Branch Correta:**
    Este repositório contém duas versões. A aplicação web completa está na branch `APIRest-liquid`. Certifique-se de estar nela:
    ```bash
    git checkout APIRest-liquid
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Configure as variáveis de ambiente:**
    Crie um arquivo chamado `.env` na raiz do projeto. Você pode copiar o conteúdo abaixo e colar nele, alterando o `SESSION_SECRET` para qualquer outra frase secreta.
    ```env
    # URL de conexão do banco de dados (usando SQLite)
    DATABASE_URL="file:./dev.db"

    # Chave secreta para assinar os cookies da sessão
    SESSION_SECRET="seu-segredo-super-secreto-aqui"
    ```

5.  **Crie e migre o banco de dados:**
    Este comando irá ler seu `schema.prisma` e criar o arquivo do banco de dados SQLite com todas as tabelas necessárias.
    ```bash
    npx prisma migrate dev
    ```

6.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    O servidor estará rodando. Abra seu navegador e acesse `http://localhost:3000`.

## Configurando o Usuário Administrador

Por questões de segurança, não existe um formulário para criar usuários com perfil de `ADMIN`. O processo é manual:

1.  **Acesse a página de registro** no seu navegador: `http://localhost:3000/users/register`.
2.  **Crie um usuário comum** preenchendo o formulário.
3.  **Abra o Prisma Studio:**
    No terminal, rode o seguinte comando:
    ```bash
    npx prisma studio
    ```
    Isso abrirá uma interface visual no seu navegador para gerenciar o banco de dados.
4.  **Promova o usuário a Administrador:**
    - No Prisma Studio, clique no modelo `User`.
    - Encontre o usuário que você acabou de registrar pelo e-mail.
    - Clique na célula da coluna `role` desse usuário, altere o valor de `"USER"` para `"ADMIN"` e clique em "Save 1 change".

Pronto! Ao fazer login com este usuário, ele terá permissões de administrador.

## Principais Rotas da Aplicação Web

### Autenticação

| Método | Rota               | Descrição                              |
| :----- | :----------------- | :------------------------------------- |
| `GET`  | `/users/register`  | Mostra a página com o formulário de registro. |
| `POST` | `/users/register`  | Processa os dados do formulário de registro. |
| `GET`  | `/users/login`     | Mostra a página com o formulário de login. |
| `POST` | `/users/login`     | Processa o login e cria a sessão do usuário. |
| `GET`  | `/users/logout`    | Destrói a sessão e desloga o usuário. |

### Playlists (Requer Autenticação)

| Método | Rota                  | Descrição                                 |
| :----- | :-------------------- | :---------------------------------------- |
| `GET`  | `/playlists`          | Mostra a lista de playlists do usuário logado. |
| `GET`  | `/playlists/create`   | Mostra o formulário para criar uma nova playlist. |
| `POST` | `/playlists`          | Processa os dados do formulário de criação. |
| `GET`  | `/playlists/:id`      | Mostra os detalhes de uma playlist específica. |
| `GET`  | `/playlists/:id/edit` | Mostra o formulário para editar uma playlist. |
| `POST` | `/playlists/:id`      | Processa os dados do formulário de edição. |
| `POST` | `/playlists/:id/delete` | Processa a exclusão de uma playlist. |

### Usuários (Requer `ADMIN`)

| Método | Rota         | Descrição                                         |
| :----- | :----------- | :------------------------------------------------ |
| `GET`  | `/users`     | Mostra a lista de todos os usuários (página de admin). |
| `PUT`  | `/users/:id` | Rota de API para atualizar um usuário (exemplo). |