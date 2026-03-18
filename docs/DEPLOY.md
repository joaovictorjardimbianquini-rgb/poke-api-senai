# Guia de Deploy — Poke API (SENAI)

Este documento descreve passos práticos para publicar a aplicação (pasta `dist/`) em provedores estáticos populares.

## Passos gerais

1. Gerar build de produção:

```bash
npm run build
```

2. Validar saída em `dist/`:

```bash
npm run preview
```

## Deploy no Vercel

1. Acesse https://vercel.com e conecte seu repositório (GitHub/GitLab/Bitbucket).
2. Configure as opções de build:
- Comando de build: `npm run build`
- Diretório de saída: `dist`
3. Deploy automático acontecerá ao criar um push na branch configurada.

Observações: Vercel detecta automaticamente projetos Vite na maioria dos casos.

## Deploy no Netlify

1. Acesse https://app.netlify.com e conecte seu repositório.
2. Configure as opções de build:
- Build command: `npm run build`
- Publish directory: `dist`
3. Netlify fará deploy automático após push.

## Deploy manual (qualquer servidor static)

Copie o conteúdo de `dist/` para o servidor estático (ex: Nginx, S3 + CloudFront).

Exemplo rápido com `serve` (local):

```bash
npm install -g serve
serve -s dist
```

## Deploy no GitHub Pages

1. Gere o build: `npm run build`
2. No repositório, crie uma branch `gh-pages` ou use Actions para publicar `dist/`.
3. Se usar GitHub Pages direto, copie `dist/` para a branch configurada e ative Pages nas configurações do repo.

Observação para SPA: configure o servidor/host para que todas as rotas sirvam o `index.html` (fallback) para evitar 404 em rotas internas.

## Exemplo de CI (GitHub Actions) — deploy com `actions/configure-pages` + `actions/upload-pages-artifact`

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
	push:
		branches: [ main ]
jobs:
	build-deploy:
		runs-on: ubuntu-latest
		steps:
			- uses: actions/checkout@v4
			- uses: pnpm/action-setup@v2
				with:
					node-version: '18'
			- run: npm ci && npm run build
			- uses: actions/upload-pages-artifact@v1
				with:
					path: './dist'
			- uses: actions/deploy-pages@v1
				with: {}
```

## Verificações pós-deploy

- Abra a URL pública e verifique: pesquisa, páginas de detalhe e montador de time.
- Verifique erros de console e 404 para assets estáticos.

## Recomendações

- Adicionar CI (GitHub Actions) que roda `npm ci`, `npm run lint` e `npm run build` em PRs.
- Ativar compressão (gzip/brotli) e cache em CDN para produção.
