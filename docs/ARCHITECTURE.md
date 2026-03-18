
# Arquitetura — Poke API (SENAI)

## Visão geral

Aplicação SPA em React (Vite) que consome a API pública PokeAPI para exibir e navegar informações de Pokémons. O objetivo é ser leve, responsiva e fácil de estender.

## Resumo das decisões arquiteturais

- Framework: Vite + React — dev server rápido, builds pequenos.
- Gerenciamento de estado: componente-local + lifting state via props. Simplicidade preserva previsibilidade; adotar Zustand/Redux somente se o escopo crescer.
- Estilos: CSS Modules para isolamento de escopo e fácil manutenção.
- Requisições HTTP: `axios` centralizado em `src/services/config.js` para interceptors e tratamento de erros.

## Componentes e responsabilidades

- `Header` — navegação e branding.
- `Pesquisa` — input e lógica de busca/pesquisa.
- `PokemonCard` — resumo do Pokémon para listas.
- `PokemonInfo` — tela de detalhes (sprites, tipos, stats).
- `TeamBuilder` — interface para montar times e persistência local (localStorage).

## Fluxo de dados (alto nível)

1. O usuário pesquisa ou navega a lista.
2. `Pesquisa` / listagem faz chamadas para `services`.
3. `services` consulta PokeAPI e retorna dados normalizados.
4. Componentes filhos recebem dados via props e renderizam UI.

## Integração com PokeAPI

- Endpoint principal usado: `https://pokeapi.co/api/v2/pokemon/{id|name}`
- Para listagens: `https://pokeapi.co/api/v2/pokemon?offset={offset}&limit={limit}`

## Observações sobre desempenho e UX

- Cache: implementar cache em memória ou usar `stale-while-revalidate` para reduzir chamadas repetidas.
- Paginação/infinite scroll: usar `limit` e `offset` da API para navegação eficiente.
- Tratamento de erros: exibir mensagens amigáveis ao usuário e retry limitado.

## Qualidade e testes

- Lint: `npm run lint` (ESLint)
- Sugestão: adicionar testes unitários com Jest + React Testing Library e testes E2E com Playwright/Cypress.

## Deploy e CI

- Build: `npm run build` produz a pasta `dist/`.
- CI sugerido: rodar `npm ci`, `npm run lint` e `npm run build` em pipeline (GitHub Actions).

## Trade-offs e próximos passos

- Manter estado local evita complexidade agora, mas dificulta sincronização entre páginas. Se necessário, introduzir gerenciador de estado global.
- Considerar otimizações de performance: lazy-loading de imagens, compressão de assets e uso de CDN.
