# API de Streaming de Música

[![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)](https://github.com/LeonardoAlmeidaPereira/ServicosWeb)

API RESTful desenvolvida em Node.js para simular um serviço de streaming de música, permitindo que usuários gerenciem suas próprias playlists. O projeto segue os princípios da arquitetura REST e implementa autenticação e autorização baseadas em JSON Web Tokens (JWT).

## Funcionalidades

-   **Autenticação de Usuários:** Sistema completo de registro e login com senhas criptografadas e tokens JWT.
-   **Controle de Acesso:** Perfis de `USER` e `ADMIN` com regras de autorização distintas.
-   **Gerenciamento de Usuários:** Operações de CRUD para usuários, restritas a administradores.
-   **Gerenciamento de Playlists:** Usuários autenticados podem criar, listar, atualizar e deletar suas próprias playlists.

## Tecnologias Utilizadas

-   **Backend:** Node.js, Express
-   **Linguagem:** TypeScript
-   **Banco de Dados:** SQLite com Prisma ORM
-   **Autenticação:** JSON Web Tokens (JWT)
-   **Validação:** Zod
-   **Testes de API:** Postman ou Insomnia (recomendado)

## Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina:
-   [Node.js](httpss://nodejs.org/en/) (versão LTS recomendada)
-   [Git](httpss://git-scm.com/)
-   Um gerenciador de pacotes como [NPM](httpss://www.npmjs.com/) ou [Yarn](httpss://yarnpkg.com/) (já vem com o Node.js)

## Como Rodar o Projeto

Siga os passos abaixo para executar a aplicação localmente:

1.  **Clone o repositório:**
    ```bash
    git clone git@github.com:LeonardoAlmeidaPereira/ServicosWeb.git
    cd ServicosWeb
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as variáveis de ambiente:**
    Crie um arquivo chamado `.env` na raiz do projeto. Você pode copiar o conteúdo abaixo e colar nele, alterando o `JWT_SECRET` para qualquer outra frase secreta.
    ```env
    # URL de conexão do banco de dados (usando SQLite)
    DATABASE_URL="file:./dev.db"

    # Chave secreta para gerar os JSON Web Tokens
    JWT_SECRET="seu-segredo-super-secreto-aqui"
    ```

4.  **Crie e migre o banco de dados:**
    Este comando irá ler seu `schema.prisma` e criar o arquivo do banco de dados SQLite com todas as tabelas necessárias.
    ```bash
    npx prisma migrate dev
    ```

5.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    O servidor estará rodando em `http://localhost:3333`.

## Configurando o Usuário Administrador

Por questões de segurança, não existe uma rota pública para criar usuários com perfil de `ADMIN`. O processo é manual e deve ser feito da seguinte forma:

1.  **Registre um usuário comum:**
    Use um cliente de API (como o Postman) para fazer uma requisição `POST` para a rota `http://localhost:3333/register` com um `name`, `email` e `password`.

2.  **Abra o Prisma Studio:**
    O Prisma Studio é uma interface visual para gerenciar seu banco de dados. Rode o seguinte comando no terminal:
    ```bash
    npx prisma studio
    ```
    Isso abrirá uma página no seu navegador.

3.  **Promova o usuário a Administrador:**
    -   No Prisma Studio, clique no modelo `User`.
    -   Encontre o usuário que você acabou de registrar pelo e-mail.
    -   Clique na célula da coluna `role` desse usuário, altere o valor de `"USER"` para `"ADMIN"` e salve a alteração.

Pronto! Agora este usuário terá permissões de administrador para acessar as rotas protegidas.

## Estrutura da API (Endpoints)

### Autenticação

| Método | Rota      | Descrição                           | Proteção |
| :----- | :-------- | :------------------------------------ | :------- |
| `POST` | `/register` | Registra um novo usuário.             | Nenhuma  |
| `POST` | `/login`    | Autentica um usuário e retorna um JWT. | Nenhuma  |

### Usuários (Admin)

| Método | Rota        | Descrição                  | Proteção    |
| :----- | :---------- | :------------------------- | :---------- |
| `GET`  | `/users`    | Lista todos os usuários.   | `ADMIN`     |
| `PUT`  | `/users/:id`  | Atualiza dados de um usuário. | `ADMIN`     |

### Playlists (Usuário Autenticado)

| Método   | Rota         | Descrição                                         | Proteção             |
| :------- | :----------- | :------------------------------------------------ | :------------------- |
| `POST`   | `/playlists`   | Cria uma nova playlist para o usuário logado.     | `Usuário Autenticado` |
| `GET`    | `/playlists`   | Lista as playlists do usuário logado.             | `Usuário Autenticado` |
| `GET`    | `/playlists/:id` | Obtém uma playlist específica do usuário logado. | `Usuário Autenticado` |
| `PUT`    | `/playlists/:id` | Atualiza uma playlist do usuário logado.         | `Usuário Autenticado` |
| `DELETE` | `/playlists/:id` | Deleta uma playlist do usuário logado.           | `Usuário Autenticado` |