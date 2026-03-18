
# Poke API — SENAI

Aplicação frontend em React (Vite) que consome a PokeAPI para buscar Pokémons, visualizar detalhes e montar times.

Índice
- [Visão geral](#vis%C3%A3o-geral)
- [Funcionalidades](#funcionalidades)
- [Quickstart](#quickstart)
- [Scripts úteis](#scripts-%C3%BAteis)
- [API utilizada](#api-utilizada)
- [Deploy](#deploy)
- [Arquitetura](#arquitetura)
- [Contribuição](#contribui%C3%A7%C3%A3o)

## Visão geral

Interface leve para explorar dados públicos da PokeAPI (https://pokeapi.co/). Permite pesquisar Pokémons, ver detalhes (tipos, stats, sprites) e montar um time localmente.

## Funcionalidades

- Pesquisa por nome ou ID
- Listagem de resultados com cartões (`PokemonCard`)
- Página de detalhe (`PokemonInfo`) com sprites, tipos e estatísticas
- Página para montar e salvar um time (Team Builder)

## Quickstart

Pré-requisitos

- Node.js 16+ (recomendado: 18+)
- npm ou yarn

Instalação e execução em desenvolvimento

```bash
npm install
npm run dev
```

Abra o navegador em `http://localhost:5173` (porta padrão do Vite).

Build e preview de produção

```bash
npm run build
npm run preview
```

Dicas rápidas

- Atualize a porta padrão com `VITE_PORT` se necessário.

## Scripts úteis

- `npm run dev` — servidor de desenvolvimento (Vite)
- `npm run build` — gera build de produção em `dist/`
- `npm run preview` — visualiza o `dist/` localmente
- `npm run lint` — executa ESLint no projeto

## API utilizada

O projeto consome a PokeAPI pública. Exemplos de uso (curl):

Buscar Pokémon por nome/ID:

```bash
curl -sS https://pokeapi.co/api/v2/pokemon/pikachu | jq '.name, .id'
```

Listar Pokémons (paginação):

```bash
curl -sS "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20" | jq '.results'
```

## Deploy

Gerar build de produção:

```bash
npm run build
```

Hospede a pasta `dist/` em um serviço de arquivos estáticos. Instruções detalhadas: [docs/DEPLOY.md](docs/DEPLOY.md)

## Arquitetura

Resumo e decisões arquiteturais: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)

## Contribuição

Contribuições são bem-vindas! Guia rápido:

1. Fork o repositório e crie uma branch (`feature/xyz`)
2. Siga o estilo de código e rode o lint:

```bash
npm run lint
```

3. Verifique localmente:

```bash
npm run dev
```

4. Abra um Pull Request com descrição clara e screenshots se aplicável.

Sugestões para PRs:

- Separe alterações de estilo/format em commits próprios
- Atualize `README.md` ou `docs/` quando alterar comportamentos visíveis

Problemas/bugs: abra uma issue detalhando passos para reproduzir.

---
Criado como exercício acadêmico (SENAI).
