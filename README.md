# Kakeylka Rent a Car

Website e sistema de reservas para a Kakeylka Rent a Car (Quelimane, Moçambique).

Stack: Next.js 14 (App Router) · TypeScript · Tailwind CSS · Prisma + Postgres (Neon) · NextAuth (credentials).

## Primeiros passos (local)

```bash
# 1. Instalar dependências
npm install

# 2. Preparar variáveis de ambiente
cp .env.example .env
# edita o .env e cola o teu DATABASE_URL / DIRECT_URL de Neon

# 3. Criar as tabelas e seedar
npm run db:push
npm run db:seed

# 4. Correr em desenvolvimento
npm run dev
```

Abre `http://localhost:3000`.

> O projeto usa Postgres (Neon) tanto em dev como em produção.
> A camada gratuita do Neon chega bem para desenvolvimento.
> Cria uma branch separada no Neon para dev se quiseres isolar.

## Credenciais iniciais do admin

Definidas em `.env`:

- Email: `ADMIN_SEED_EMAIL` (por omissão `admin@kakeylka.co.mz`)
- Password: `ADMIN_SEED_PASSWORD` (muda após o primeiro login)

Entra em `/admin/login`.

## Deploy na Vercel com Neon

### 1. Criar a base de dados no Neon

1. Vai a <https://neon.tech> e cria conta.
2. **New Project** → nome "kakeylka", região Europe (ex. `aws-eu-central-1`).
3. No dashboard do projeto, abre **Connection string**.
4. Copia a **Pooled connection** (acaba em `-pooler…`) → vai ser o `DATABASE_URL`.
5. Alterna para **Direct connection** → vai ser o `DIRECT_URL`.

### 2. Importar o repo na Vercel

1. Vai a <https://vercel.com/new> e importa `Miglz7wr405/Rent-a-car-`.
2. **Framework Preset**: Next.js (detetado automaticamente).
3. **Environment Variables** — adiciona:

| Nome | Valor |
|---|---|
| `DATABASE_URL` | pooled do Neon |
| `DIRECT_URL` | direct do Neon |
| `NEXTAUTH_SECRET` | gera com `openssl rand -base64 32` |
| `NEXTAUTH_URL` | `https://<nome-do-projeto>.vercel.app` (preenche com algo temporário; corriges após o primeiro deploy) |
| `ADMIN_SEED_EMAIL` | `admin@kakeylka.co.mz` |
| `ADMIN_SEED_PASSWORD` | password temporária que vais trocar |

4. **Deploy**. O build vai executar: `prisma generate` → `prisma db push` → seed → `next build`.
5. Quando terminar, a Vercel mostra o URL final (ex. `rent-a-car-xyz.vercel.app`).
   - Volta a **Settings → Environment Variables**, corrige `NEXTAUTH_URL` com esse URL.
   - **Deployments → ...** → **Redeploy** para o NextAuth passar a usar o URL certo.

### 3. Primeiro login no admin

Abre `https://<teu-projeto>.vercel.app/admin/login` com as credenciais do seed.

### Troubleshooting

- **Build falha com "DATABASE_URL not set"**: faltou colar as variáveis antes do primeiro Deploy. Corrige em Settings e redeploy.
- **404 DEPLOYMENT_NOT_FOUND**: o projeto ainda não existe nessa URL. Confirma o URL exacto no dashboard da Vercel; o URL do projeto só aparece depois do primeiro deploy correr com sucesso.
- **500 ao abrir qualquer página**: provavelmente `NEXTAUTH_URL` ainda está errado ou a `DATABASE_URL` não é o endpoint pooled.

## Estrutura

- `app/(public)/` — páginas públicas (home, viaturas, detalhes, contactos, confirmação)
- `app/admin/` — painel administrativo (dashboard, viaturas, reservas, definições)
- `app/api/` — rotas de API (reservas públicas, CRUD admin)
- `components/` — componentes reutilizáveis
- `lib/` — utilitários (db, auth, pricing, availability, whatsapp, format)
- `prisma/` — schema e seed

## Painel administrativo (minimal)

1. **Dashboard** — contadores e atividade recente.
2. **Viaturas** — CRUD completo (criar, editar, arquivar) com imagens.
3. **Reservas** — lista com filtros e ações rápidas.
4. **Definições** — contactos, WhatsApp, horário, morada.

## Scripts

| Script | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção (inclui `db push` + seed) |
| `npm run start` | Servir build de produção |
| `npm run lint` | ESLint |
| `npm run db:push` | Aplica o schema no Postgres |
| `npm run db:seed` | Carrega viaturas, admin e definições |
| `npm run db:reset` | Reset total da base de dados (apaga tudo e volta a seedar) |

## Notas

- Imagens iniciais vêm do Unsplash (licença permissiva); substitui pelas fotografias reais da frota via painel admin.
- Preços são estimativas de referência para o mercado de Quelimane e devem ser confirmados pela empresa.
- WhatsApp configurado para o número publicado em diretórios (`+258 84 411 6974`); editável nas Definições.
