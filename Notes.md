# Prisma

## Iniciando prisma usando SQLite

O default é PostgreSQL
cria pasta prisma com schema.prisma e .env

```bash
npx prisma init --datasource-provider SQLite
```

## Versionamento de Banco de Dados

Cria arquivos com instruções para composição do Banco de Dados
Ao rodar as migrations a ultima versão do BD será usada

```bash
npx prisma migrate dev
```

## Interface gráfica do prisma

```bash
npx prisma studio
```

## Criaçãode Diagramas Entidade Relacionamento ERD

Isntalação

```bash
npm i prisma-erd-generator @mermaid-js/mermaid-cli -D
```

Geração

```bash
npx prisma generate
```

Antes de ser gerado, deve ser configurado em schema.prisma como

```prisma
generator erd {
    provider = "prisma-erd-generator"
}
```

# Fastify Cors

Mecanismo de segurança que informa quais aplicações podem consulmir os dados do backend

```bash
npm i @fastify/cors
```
