# Kakeylka Rent a Car

Website e sistema de reservas para a Kakeylka Rent a Car (Quelimane, Moçambique).

Stack: Next.js 14 (App Router) · TypeScript · Tailwind CSS · Prisma + SQLite · NextAuth (credentials).

## Primeiros passos

```bash
# 1. Instalar dependências
npm install

# 2. Preparar variáveis de ambiente
cp .env.example .env

# 3. Criar a base de dados e seedar
npm run db:push
npm run db:seed

# 4. Correr em desenvolvimento
npm run dev
```

Abre `http://localhost:3000`.

## Credenciais iniciais do admin

Definidas em `.env`:

- Email: `ADMIN_SEED_EMAIL` (por omissão `admin@kakeylka.co.mz`)
- Password: `ADMIN_SEED_PASSWORD` (muda após o primeiro login)

Entra em `/admin/login`.

## Estrutura

- `app/(public)/` — páginas públicas (home, viaturas, detalhes, contactos, confirmação)
- `app/admin/` — painel administrativo (dashboard, viaturas, reservas, definições)
- `app/api/` — rotas de API (reservas públicas, CRUD admin)
- `components/` — componentes reutilizáveis
- `lib/` — utilitários (db, auth, pricing, availability, whatsapp, format)
- `prisma/` — schema e seed

## O painel administrativo tem só o essencial

1. **Dashboard** — contadores e atividade recente.
2. **Viaturas** — CRUD completo (criar, editar, arquivar) com imagens.
3. **Reservas** — lista com filtros e ações rápidas (confirmar, recusar, cancelar, concluir).
4. **Definições** — contactos públicos, WhatsApp, horário, morada.

## Scripts úteis

| Script | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Servir build de produção |
| `npm run lint` | ESLint |
| `npm run db:push` | Aplica o schema na base de dados |
| `npm run db:seed` | Carrega viaturas, admin e definições |
| `npm run db:reset` | Reset total da base de dados (apaga tudo) |

## Variáveis de ambiente

- `DATABASE_URL` — URL do Prisma (SQLite por omissão)
- `NEXTAUTH_URL` — URL do site (ex. `https://kakeylka.co.mz`)
- `NEXTAUTH_SECRET` — segredo para NextAuth (gera com `openssl rand -base64 32`)
- `ADMIN_SEED_EMAIL` / `ADMIN_SEED_PASSWORD` — credenciais iniciais do admin

## Notas

- Imagens iniciais vêm do Unsplash (licença permissiva); substitui pelas fotografias reais da frota via painel admin.
- Preços são estimativas de referência para o mercado de Quelimane e devem ser confirmados pela empresa.
- WhatsApp configurado para o número publicado em diretórios (`+258 84 411 6974`); editável nas Definições.

## Deploy

Pronto para Vercel. Em produção, troca `DATABASE_URL` para Postgres (Supabase, Neon, etc.) e corre a migração correspondente.
