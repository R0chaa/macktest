# Frontend - MackTest

Parte referente ao front do sistema de gestão de turmas proposto como desafio técnico do SME. Desenvolvido com Next.js, React 19 e Tailwind. Este projeto foi construído com foco em qualidade de código e experiência do usuário ao interagir com os componentes.

## Sobre o Projeto

O front está gerenciando turmas escolares, permitindo visualização, criação, edição e exclusão de turmas, além de oferecer funcionalidades de busca e filtragem. Tentei me aproximar ao máximo de todos os detalhes propostos no protótipo, incluindo padrões de cores, layout com 7 colunas para telas grandes, estética com tons claros e mantendo uma alternância de cor entre os componentes para melhorar a legibilidade.

## Tecnologias Principais

- **Next.js**
- **TypeScript**
- **React 19**
- **Tailwind**
- **Tabler Icons** - Biblioteca de ícones dos sistemas internos do Mackenzie
- **Playwright** - Testes end-to-end

## Como Executar

### Pré-requisitos

- Node.js 20 ou superior
- npm ou yarn

### Instalação

```bash
cd frontend
npm install
```

### Executando

```bash
cd frontend
npm run dev
```

O servidor de dev está em `http://localhost:3000`

### Testes

```bash
cd frontend
npx playwright test
```

## Qualidade de código (ESLint + Prettier)

Configurei um ESLint básico para garantir boas práticas e usei a extensão Prettier para manter indentação e formatação consistentes em todo o código. O projeto usa o flat config do ESLint com as recomendações do Next.js (Core Web Vitals + TypeScript) e alguns ignores globais.

- `npm run lint` - executa o linter e checa boas práticas e possíveis problemas.
- `npm run lint:fix` - executa o linter e tenta corrigir problemas automaticamente.

## Estrutura do Projeto

```
frontend/
├── app/
│   ├── layout.tsx
│   ├── page.tsx           # Página inicial
│   ├── not-found.tsx      # Página 404
│   └── globals.css
├── components/
│   ├── card/              # Componentes de cards
│   ├── forms/             # Componentes de formulário
│   ├── modal/             # Modais e diálogos
│   └── ui/                # Componentes base de UI
├── hooks/                 # Custom hooks
├── services/              # Serviços da API
├── types/                 # Definições TypeScript
├── tests/                 # Testes
```

## Decisões de Arquitetura e Design

### Componentização e Clean Code

Optei por uma arquitetura fortemente baseada em componentes, focando em práticas de clean code. Cada elemento da interface foi pensado como um componente reutilizável e independente, visando um entendimento mais simples do código e fácil manutenibilidade. A estrutura de pastas está assim:

- `components/` - Componentes de UI reutilizáveis
- `components/card/` - Componentes específicos de cards de turmas
- `components/modal/` - Modais e diálogos
- `components/forms/` - Componentes de formulário
- `components/ui/` - Componentes base de interface
- `hooks/` - Custom hooks para lógica reutilizável
- `services/` - Camada de comunicação com a API

### Componente Activity

Uma das decisões mais legais que tive foi utilizar o novo componente `<Activity>` do React 19. Este componente nos ajuda a esconder/mostrar qualquer componente de um componente pai de forma nativa.

Quando envolvemos nosso componente com o componente `Activity`, ele nos dá o poder de esconder ou mostrar o componente usando sua única prop `mode` (além do `children`), cujo valor pode ser `visible` ou `hidden`. Quando é `visible`, ele age como o componente `React.Fragment`, ou seja, só age como um wrapper e não adiciona nada à árvore de elementos do documento. Não sendo mais uma regra usar operadores de conjunção lógica (&&) ou operadores condicionais.

E quando é definido como `hidden`, ele marca a propriedade `display` do elemento como `hidden`, salva o estado, remove os efeitos e desprioriza as re-renderizações. Isso resulta em melhor performance e código mais limpo.

Refs:

- https://react.dev/reference/react/Activity
- https://javascript.plainenglish.io/tried-react-19s-activity-component-here-s-what-i-learned-b0f714003a65

### Tabler Icons

Escolhi utilizar a biblioteca de ícones Tabler Icons que usamos nos sistemas internos do Mack para me aproximar dos propostos no protótipo.

### Responsividade

Adotei a abordagem mobile-first do Tailwind CSS. O estilo base atende telas pequenas e, com os prefixos responsivos (sm, md, lg…), o layout escala para resoluções maiores.

### Interatividade e Acessibilidade

Implementei hover, tooltips e resposta a cliques em diversas situações para tornar a navegação mais clara e intuitiva. Por exemplo, os cards de turmas são elementos clicáveis em qualquer área para facilitar seleção.

### Tratamento de Rotas

Criei uma página para tratamento de rotas não existentes, garantindo feedback quando um user acessa URLs inválidas.

## Funcionalidades

### CRUD Completo de Turmas

O sistema permite criar, ler, atualizar e deletar turmas. Tomei a decisão de permitir o cadastro de turmas com erros sem validar no front ou com Zod no backend. Assim é possível demonstrar a funcionalidade de alerts de erros nos cards.

### Busca e Filtragem

- Busca por nome de turma
- Filtro por segmento (Ensino Fundamental, Ensino Médio)
- Filtro por ano/série
- Filtro por tipo (Regular, Mista, Trilha)
- Os filtros podem ser combinados simultaneamente
- Debounce na busca para otimizar requisições

## Testes

Implementei os testes E2E com Playwright como estava proposto na descrição. Criei 8 cenários relacionados a busca e filtragem de turmas:

1. Exibir todas as turmas inicialmente
2. Filtrar turmas na busca por nome
3. Filtrar turmas por segmento
4. Filtrar turmas por ano/série
5. Filtrar cards de turmas por tipo
6. Combinar busca por nome e filtros
7. Limpar a busca e mostrar todas as turmas novamente
8. Exibir mensagem de 'nenhuma turma encontrada'

Os testes incluem execuções em dispositivos mobile (Pixel 5 no Chrome e Iphone 12 no Safari).
