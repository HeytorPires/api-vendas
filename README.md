# API de Vendas (api-vendas) 🚀

Um projeto de API back-end desenvolvido com Node.js e TypeScript, focado em estudos e na aplicação de boas práticas de desenvolvimento de software.

## 🎯 Objetivos de Estudo e Práticas (Checklist)

Esta API foi concebida como um projeto de estudo. Os seguintes objetivos e práticas são o foco principal:

- [x] Consolidar e aplicar um conjunto diversificado de práticas e tecnologias de desenvolvimento de software em um ambiente prático.
- [x] Implementação de JWT (JSON Web Tokens) para autenticação e autorização.
- [x] Utilização de serviços de mensageria (ex: envio de e-mail com Nodemailer) para funcionalidades como redefinição de senha.
- [x] Explorar e aplicar conceitos de **Domain-Driven Design (DDD)** para a arquitetura do software.
- [x] Utilizar ferramentas modernas para otimizar o ciclo de desenvolvimento e deploy.
- [x] Criar uma base de código limpa, organizada, testável e escalável.
- [x] Implementar uma suíte robusta de **testes automatizados**:
  - [ ] Testes Unitários
  - [x] Testes de Integração
  - [ ] Testes End-to-End (E2E)

---

## ✨ Funcionalidades Implementadas

- 👤 **Gerenciamento de Usuários:**
  - CRUD (Criar, Ler, Atualizar, Deletar) completo de usuários.
  - Autenticação de usuários utilizando JWT.
  - Processo de recuperação de senha.
  - Upload de avatar de usuário.
- 🛍️ **Gerenciamento de Produtos:**
  - CRUD completo de produtos.
- 👥 **Gerenciamento de Clientes:**
  - CRUD completo de clientes.
- 🛒 **Gerenciamento de Pedidos:**
  - CRUD completo de pedidos, associando clientes e produtos.
  - Cálculo do total do pedido.
  - Listagem de pedidos por cliente.

---

## 🛠️ Tecnologias Utilizadas

- **Node.js:** Ambiente de execução JavaScript server-side.
- **TypeScript:** Superset do JavaScript que adiciona tipagem estática, melhorando a robustez e manutenibilidade do código.
- **Express.js:** Framework web minimalista e flexível para Node.js, utilizado para construir as rotas da API.
- **TypeORM:** ORM (Object-Relational Mapper) para interação com o banco de dados, facilitando a modelagem e manipulação dos dados.
- **Banco de Dados:** PostgreSQL 8.13
- **Docker & Docker Compose:** Para containerização da aplicação e do ambiente de desenvolvimento/produção, garantindo consistência e facilidade de configuração.
- **JWT (jsonwebtoken):** Biblioteca para geração e verificação de JSON Web Tokens para autenticação.
- **bcrypt.js:** Biblioteca para hashing de senhas.
- **Nodemailer:** Para envio de e-mails (ex: confirmação de cadastro, redefinição de senha).
- **Redis:** Banco de dados em memória utilizado para cache de dados, otimizando o desempenho das respostas e gerenciamento de listas de invalidação de tokens.
- **ESLint:** Ferramenta para identificar e reportar padrões problemáticos no código JavaScript/TypeScript, ajudando a manter a qualidade do código.
- **Prettier:** Formatador de código para manter um estilo consistente em todo o projeto.

---

## 📋 Pré-requisitos

Antes de começar, garanta que você tenha instalado em sua máquina:

- [Node.js](https://nodejs.org/) (v18 ou superior recomendado)
- [Yarn](https://yarnpkg.com/) (preferencialmente) ou [npm](https://www.npmjs.com/) (gerenciador de pacotes do Node.js)
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/) (para gerenciamento de containers)
- [Git](https://git-scm.com/) (para versionamento de código)

---

## ⚙️ Configuração e Instalação

Siga os passos abaixo para configurar e executar o projeto localmente:

1.  **Clone o repositório:**

    ```bash
    git clone [https://github.com/HeytorPires/api-vendas.git](https://github.com/HeytorPires/api-vendas.git)
    cd api-vendas
    ```

2.  **Instale as dependências:**

    ```bash
    yarn install
    # ou, se preferir o npm:
    # npm install
    ```

3.  **Configuração do Ambiente:**

    - Copie o arquivo de exemplo `.env.example` para um novo arquivo chamado `.env`:
      ```bash
      cp .env.example .env
      ```
    - Edite o arquivo `.env` com as suas configurações de ambiente. Isso inclui:
      - Credenciais de conexão com o banco de dados (host, porta, usuário, senha, nome do banco).
      - Chaves secretas para JWT (ex: `APP_SECRET`).
      - Configurações do serviço de e-mail (host, porta, usuário, senha do Nodemailer).
      - Configurações do Redis.
      - Porta da aplicação (ex: `APP_PORT=3333`).
      - URL da aplicação (ex: `APP_API_URL=http://localhost:3333`).
      - Outras variáveis específicas do seu projeto.
    - **Atenção:** Se você **não** for utilizar o Docker para o banco de dados, certifique-se de que as variáveis no `.env` apontam para uma instância de banco de dados acessível manualmente.

4.  **Subir os Serviços com Docker (Banco de Dados, Redis, etc.):**

    - Certifique-se de que o Docker Desktop (ou Docker Engine/Compose) está em execução.
    - O comando `yarn docker:up` (ou similar, verifique seu `package.json`) utiliza o `docker-compose.yml` para subir os containers necessários (aplicação, banco de dados, Redis, etc.).
      ```bash
      yarn docker:up
      # ou, se o comando for direto com docker-compose:
      # docker-compose up -d
      ```
    - Aguarde até que todos os containers estejam ativos e saudáveis. Você pode verificar os logs com `docker-compose logs -f`.

5.  **Executar Migrations (TypeORM):**
    Após o container do banco de dados estar ativo e acessível, execute as migrations para criar as tabelas e estruturas necessárias.
    ```bash
    yarn typeorm migration:run
    # ou o comando equivalente para o seu ORM e scripts definidos no package.json
    ```
    _Nota: Pode ser necessário executar este comando dentro do container da aplicação se o TypeORM CLI estiver configurado para rodar a partir do ambiente do container._
    ```bash
    # Exemplo para executar dentro do container (verifique o nome do serviço no docker-compose.yml):
    # docker-compose exec NOME_DO_SERVICO_DA_APP yarn typeorm migration:run
    ```

---

## ▶️ Executando a Aplicação

### Modo de Desenvolvimento

Com o ambiente configurado e o banco de dados pronto, inicie a aplicação em modo de desenvolvimento (geralmente com hot-reload):

```bash
yarn dev
# ou
# npm run dev
```

A API estará disponível em `http://localhost:PORTA_DEFINIDA_NO_.ENV` (ex: `http://localhost:3333`).

### Modo de Produção (Build)

Para gerar a build de produção:

```bash
yarn build
```

E para iniciar a aplicação a partir da build:

```bash
yarn start
```

## 📜 Scripts Principais no `package.json`

Verifique o arquivo `package.json` para a lista completa de scripts. Alguns dos mais comuns podem ser:

- `dev`: Inicia o servidor em modo de desenvolvimento.
- `typeorm`: Acesso à CLI do TypeORM para operações de banco de dados.
- `typeorm: run`: Acesso as rodar as migrations do TypeORM para operações de banco de dados.
- `typeorm: generate`: Acesso as geração de migrations do TypeORM para operações de banco de dados.
- `up`: Sobe os containers Docker definidos no `docker-compose.yml`.
-

---

## 🏗️ Estrutura do Projeto

```
/
├── dist/                     # Código transpilado para produção
├── src/                      # Código fonte da aplicação
│   ├── @types/               # Definições de tipos globais
│   ├── config/               # Arquivos de configuração (auth, database, mail, upload)
│   ├── modules/              # Módulos da aplicação (DDD: Domínios)
│   │   ├── users/            # Exemplo de módulo de usuário
│   │   │   ├── domain/       # Entidades, Repositórios (interfaces), Serviços de Domínio
│   │   │   │   ├── models/
│   │   │   │   └── repositories/
│   │   │   ├── infra/        # Implementações de infraestrutura (TypeORM entities, repositories)
│   │   │   │   ├── http/     # Controladores, rotas, middlewares específicos do módulo
│   │   │   │   └── typeorm/
│   │   │   └── services/     # Services (Application Services)
│   ├── shared/               # Código compartilhado entre módulos
│   │   ├── infra/            # Infraestrutura compartilhada (http server, typeorm connection)
│   │   │   ├── http/
│   │   │   └── typeorm/
│   │   │       └── migrations/
│   │   │
│   │   ├── container/        # Configuração de injeção de dependência
│   │   └── errors/           # Classes de erro personalizadas
│   └── server.ts             # Ponto de entrada da aplicação
├── .env.example              # Arquivo de exemplo para variáveis de ambiente
├── .gitignore                # Arquivos e pastas ignorados pelo Git
├── docker-compose.yml        # Configuração do Docker Compose
├── Dockerfile                # Instruções para build da imagem Docker da aplicação
├── package.json              # Metadados do projeto e dependências
├── tsconfig.json             # Configuração do compilador TypeScript
└── yarn.lock                 # Lockfile do Yarn
```

---

## 🤝 Como Contribuir

Este é um projeto de estudo, mas contribuições são bem-vindas! Se você tiver sugestões, melhorias ou correções:

1.  Faça um **Fork** do projeto.
2.  Crie uma nova **Branch** (`git checkout -b feature/sua-feature` ou `fix/seu-fix`).
3.  Faça suas alterações e **Commit** (`git commit -m 'feat: Adiciona nova funcionalidade X'`). Siga o padrão de [Conventional Commits](https://www.conventionalcommits.org/).
4.  Envie suas alterações para o seu fork (`git push origin feature/sua-feature`).
5.  Abra um **Pull Request**.

---

## 📝 Licença

Este projeto é distribuído sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
