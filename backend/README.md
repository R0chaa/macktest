# Backend - MackTest

API REST desenvolvida com Fastify e TypeScript para gerenciamento de turmas escolares, parte do desafio técnico proposto pela equipe do SME. Este backend foi construído com foco em simplicidade, performance e facilidade de manutenção.

## Sobre o Projeto

O backend fornece uma API REST completa para operações CRUD de turmas, além de funcionalidades de busca, filtragem e estatísticas. A arquitetura foi pensada para ser clara e direta, facilitando tanto o desenvolvimento quanto a manutenção.

## Tecnologias Principais

- **Fastify** - Framework web rápido e eficiente
- **TypeScript** - Tipagem estática para maior segurança
- **Dados Mockados** - Facilitou o desenvolvimento

## Documentação da API

Criei uma documentação no Swagger para detalhar a API. Ela está disponível pelo link:

**https://app.swaggerhub.com/apis-docs/mackenzie-458/macktest/1.0.0**

A documentação inclui todos os endpoints, parâmetros, exemplos de requisições e respostas, facilitando o entendimento e uso da API.

## Como Executar

### Pré-requisitos

- Node.js 20 ou superior
- npm ou yarn

### Instalação

```bash
cd backend
npm install
```

### Desenvolvimento

```bash
cd backend
npm run dev
```

O servidor estará disponível em `http://localhost:3001`

## Estrutura do Projeto

```
backend/
├── src/
│   ├── routes/          # Definição das rotas da API
│   ├── services/        # Lógica de negócio
│   ├── repositories/   # Camada de acesso aos dados mockados que criei
│   ├── types/           # Definições
│   ├── utils/           # Utilitários e helpers
│   └── server.ts        # Configuração e inicialização do servidor
├── tsconfig.json
└── package.json
```

## Decisões de Arquitetura

### Fastify como Framework

Escolhi utilizar o Fastify porque ele é um framework bem interessante e rápido, além de estar em alta. Ele oferece performance e uma API limpa e intuitiva.

### Query Parameters para Filtros

Utilizei query parameters para compor a busca pela URL e facilitar combinações de filtros. Isso permite que os filtros sejam facilmente combinados na URL, tornando as requisições mais flexíveis e testáveis. Por exemplo:

```
GET /api/classes?segmento=Ensino%20Médio&ano=1ª%20Série&tipo=Regular&search=Turma%20A
```

### BaseUrl no tsconfig.json

Configurei o `baseUrl` no `tsconfig.json` para deixar imports padronizados na raiz. Isso permite usar imports absolutos como `@/services/ClassService` ao invés de caminhos relativos como `../../services/ClassService`, tornando o código mais limpo e fácil de refatorar.

### Dados Mockados

Optei por utilizar dados mockados. Até pensei em conectar diretamente ao Supabase com PostgreSQL, cheguei a criar o banco e os códigos SQL. Mas utilizando o Supabase com Postgres, os dados ficam permissionados e apenas recarregando o server para voltar com os dados é mais prático para desenvolvimento e testes. Com dados mockados, posso garantir um estado consistente e previsível para testes e demonstrações.

### Validação Ausente

Tomei a decisão de não integrar o Zod para validar parâmetros dos endpoints. Assim permito cadastros com erros e demonstro com mais facilidade o handler dos cards com informações erradas no frontend.

## Endpoints Disponíveis

### Health Check

- `GET /health` - Verifica se o serviço está ok

### Turmas

- `GET /api/classes` - Lista turmas com filtros opcionais
- `GET /api/classes/:id` - Busca turma por ID
- `POST /api/classes` - Cria nova turma
- `PUT /api/classes/:id` - Atualiza turma existente por id
- `DELETE /api/classes/:id` - Remove turma por id

### Utilitários

- `GET /api/filters` - Retorna opções de filtros disponíveis
- `GET /api/stats` - Retorna estatísticas do sistema

## Arquitetura de Camadas

O projeto segue uma arquitetura em camadas:

1. **Routes** - Recebem requisições HTTP e delegam para os services
2. **Services** - Contêm a lógica de negócio e orquestram as operações
3. **Repositories** - Gerenciam o acesso aos dados (mockados no caso atual)
4. **Utils** - Funções auxiliares como tratamento de erros e construção de filtros

Essa separação facilita a manutenção, testes e futuras mudanças, como migrar de dados mockados para um banco de dados real.

## Tratamento de Erros

Implementei um sistema centralizado de tratamento de erros através do `errorHandler.ts`, que padroniza as respostas de erro e facilita a manutenção. Todos os erros são logados e retornam mensagens consistentes para o cliente.
