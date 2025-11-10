# MackTest

Projeto desenvolvido a partir de um desafio técnico da equipe do SME. É um sistema simples e eficiente para gerenciar turmas escolares, com backend em Fastify/TypeScript e frontend em Next.js/TailwindCSS.

## Estrutura do Projeto

O projeto está organizado em duas pastas principais:

- **`backend/`** - API REST desenvolvida com Fastify e TypeScript
- **`frontend/`** - Interface web desenvolvida com Next.js e TailwindCSS

Cada pasta possui seu próprio README explicando as decisões que tomei, tecnologias utilizadas e como executar:

- [README do Backend](./backend/README.md) - Detalhes sobre a API, endpoints, arquitetura e decisões técnicas
- [README do Frontend](./frontend/README.md) - Detalhes sobre a interface, componentes, funcionalidades e decisões de design

## Sobre o Desenvolvimento

Busquei me aproximar ao máximo daquilo proposto no protótipo, mantendo fidelidade aos padrões de cores, layout responsivo e estética visual. Além disso, implementei funcionalidades adicionais para enriquecer a experiência do usuário que são comuns em sistemas CRUD:

### Funcionalidades

- **CRUD Completo de Turmas** - Criar, visualizar, editar e excluir turmas
- **Busca e Filtragem** - Busca por nome, filtros por segmento, ano/série e tipo
- **Paginação de Cards** - Controle de itens por página (10, 20, 30, 50) com navegação
- **Menu Mobile Responsivo** - Sidebar adaptável para dispositivos móveis
- **Toasts de Confirmação** - Feedback visual para ações de Create, Update e Delete
- **Cards Clicáveis** - Encapsulamento do card como elemento interativo para melhor UX
- **Tratamento de Rotas** - Página 404 personalizada para rotas não encontradas

## Interface e Design

<img width="1920" height="1080" alt="detalhes de cores" src="https://github.com/user-attachments/assets/8234cb49-7f87-4425-bce2-36335769fbdf" />

<img width="4500" height="3000" alt="System" src="https://github.com/user-attachments/assets/1e21b247-70c1-4a05-a829-2e5028ff679d" />

<img width="4500" height="3000" alt="mobileScreen" src="https://github.com/user-attachments/assets/e26e3d9d-83b5-4cbd-822b-abbd4f5a0875" />

<img width="4500" height="3000" alt="telas desk" src="https://github.com/user-attachments/assets/6fc6ca4f-e2a5-4584-bc98-31ec73c45c22" />

## Documentação da API

Criei uma documentação completa no Swagger para facilitar o entendimento e uso da API:

**[Acessar Documentação Swagger](https://app.swaggerhub.com/apis-docs/mackenzie-458/macktest/1.0.0)**

<img width="1514" height="820" alt="image" src="https://github.com/user-attachments/assets/dd5e4b88-0829-4f0c-a7fa-67bd56a4f266" />

A documentação inclui todos os endpoints disponíveis, parâmetros de requisição, exemplos de requisições e respostas, facilitando a integração e testes na API.

## Schema dos Dados

<img width="297" height="447" alt="image" src="https://github.com/user-attachments/assets/3b861a3f-3c6b-4433-af8a-d05f46287abd" />

Estrutura dos dados utilizada no sistema.

## Como Executar

### Backend

```bash
cd backend
npm install
npm run dev
```

O servidor estará disponível em `http://localhost:3001`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`

## Testes

Os testes E2E estão configurados com Playwright. Para executar:

```bash
cd frontend
npx playwright test
```

O workflow do GitHub Actions está configurado para executar os testes automaticamente em cada push e pull request.

## Agradecimentos

Obrigado pela oportunidade de realizar esse desafio, foi uma experiência muito bacana!
