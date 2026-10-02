# Kakeylka Rent a Car

Website e sistema de reservas para a Kakeylka Rent a Car (Quelimane, Moçambique).

Stack: Next.js 14 (App Router) · TypeScript · Tailwind CSS · Prisma + Postgres · NextAuth.

## Deploy na Vercel (automático, 4 passos)

Não precisas de criar conta em Neon, Supabase ou qualquer lado. A Vercel trata de tudo.

### Passo 1 — Importar o repositório

Vai a **https://vercel.com/new**, autoriza o teu GitHub e importa `Miglz7wr405/Rent-a-car-`. Carrega **Deploy**.

> O primeiro deploy vai **falhar** com "DATABASE_URL is not set" — é normal. Continua no Passo 2.

### Passo 2 — Criar a base de dados (2 cliques)

Dentro do projeto na Vercel:
1. Aba **Storage** → **Create Database** → escolhe **Postgres** → **Create**.
2. Clica **Connect Project** se te pedir.

A Vercel liga a base ao projeto e preenche `DATABASE_URL` sozinha nas variáveis de ambiente.

### Passo 3 — Redeploy

Vai a **Deployments** → clica os três pontinhos do último deploy → **Redeploy**.

O build desta vez corre tudo:
- Instala dependências
- Gera o cliente Prisma
- Cria todas as tabelas na base de dados
- Carrega as 8 viaturas iniciais
- Cria o utilizador admin
- Faz o build do Next.js

### Passo 4 — Obter as credenciais do admin

Depois do redeploy terminar, vai a **Deployments → último → Build Logs** e procura uma caixa parecida com esta:

```
╔══════════════════════════════════════════════════╗
║  ADMIN KAKEYLKA CRIADO — GUARDA ESTAS CREDENCIAIS ║
╠══════════════════════════════════════════════════╣
║  Email:    admin@kakeylka.co.mz                   ║
║  Password: Xy7Kp2mQ9nRt                           ║
╚══════════════════════════════════════════════════╝
```

Copia essa password e entra em `https://<teu-projeto>.vercel.app/admin/login`.

Depois do primeiro login, **muda a password** em `/admin/definicoes` (ou define uma `ADMIN_SEED_PASSWORD` fixa nas variáveis de ambiente da Vercel).

Pronto. O site está no ar.

---

## Desenvolvimento local

```bash
# 1. Instalar
npm install

# 2. Pôr a tua DATABASE_URL de Postgres no .env
cp .env.example .env

# 3. Criar tabelas e seedar
npm run db:push && npm run db:seed

# 4. Dev
npm run dev
```

## Painel administrativo (minimal — 4 áreas)

1. **Dashboard** — contadores e atividade recente.
2. **Viaturas** — CRUD (criar, editar, arquivar) com imagens.
3. **Reservas** — lista com filtros e ações (confirmar / recusar / cancelar / concluir).
4. **Definições** — contactos, WhatsApp, horário, morada.

## Scripts

| Script | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build (inclui `db push` + seed automáticos) |
| `npm run start` | Servir build |
| `npm run lint` | ESLint |
| `npm run db:push` | Aplica o schema |
| `npm run db:seed` | Carrega viaturas, admin e definições |
| `npm run db:reset` | Apaga tudo e volta a seedar |

## Variáveis de ambiente (todas opcionais em produção)

| Variável | Precisa definir? |
|---|---|
| `DATABASE_URL` | Não — Vercel preenche automaticamente ao criar a Postgres |
| `NEXTAUTH_SECRET` | Não — Vercel usa um fallback estável; define para produção séria |
| `ADMIN_SEED_EMAIL` | Não — por omissão `admin@kakeylka.co.mz` |
| `ADMIN_SEED_PASSWORD` | Não — gerada aleatoriamente e impressa no Build Log |

## Notas

- Fotografias iniciais vêm do Unsplash (podes substituir no painel admin).
- Preços são estimativas para o mercado de Quelimane, editáveis no painel.
- WhatsApp predefinido para `+258 84 411 6974`, mudável nas Definições.
