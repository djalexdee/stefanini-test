# Guia de Uso do Docker

Este guia explica como usar Docker e Docker Compose para desenvolvimento local.

## 📋 Pré-requisitos

- Docker instalado
- Docker Compose instalado

## 🚀 Início Rápido

### 1. Subir o PostgreSQL

```bash
npm run docker:up
```

Ou manualmente:
```bash
docker-compose up -d
```

### 2. Verificar se o container está rodando

```bash
docker-compose ps
```

### 3. Ver logs do PostgreSQL

```bash
npm run docker:logs
```

Ou manualmente:
```bash
docker-compose logs -f postgres
```

### 4. Parar o PostgreSQL

```bash
npm run docker:down
```

Ou manualmente:
```bash
docker-compose down
```

## 🗄️ Configuração do Banco de Dados

O Docker Compose está configurado para criar um banco PostgreSQL com as seguintes credenciais:

- **Host**: localhost
- **Porta**: 5432
- **Usuário**: postgres
- **Senha**: postgres
- **Database**: stefanini_db

### String de Conexão

```
postgresql://postgres:postgres@localhost:5432/stefanini_db?schema=public
```

## 📦 Volumes

O Docker Compose cria um volume persistente chamado `postgres_data` para manter os dados do banco mesmo após parar o container.

### Remover o volume (cuidado: apaga todos os dados)

```bash
docker-compose down -v
```

## 🔧 Comandos Úteis

### Acessar o container PostgreSQL

```bash
docker exec -it stefanini-postgres psql -U postgres -d stefanini_db
```

### Executar migrações Prisma

```bash
npm run prisma:migrate
```

### Popular o banco com dados de exemplo

```bash
npm run prisma:seed
```

### Abrir Prisma Studio

```bash
npm run prisma:studio
```

## 🐛 Troubleshooting

### Porta 5432 já em uso

Se a porta 5432 já estiver em uso, você pode alterar a porta no `docker-compose.yml`:

```yaml
ports:
  - "5433:5432"  # Mude de 5432 para 5433
```

E atualize a `DATABASE_URL` no `.env`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/stefanini_db?schema=public"
```

### Container não inicia

Verifique os logs:

```bash
docker-compose logs postgres
```

### Reiniciar o container

```bash
npm run docker:restart
```

Ou manualmente:

```bash
docker-compose restart postgres
```

### Resetar o banco de dados

```bash
# Parar e remover containers e volumes
docker-compose down -v

# Subir novamente
docker-compose up -d

# Executar migrações
npm run prisma:migrate

# Popular com dados de exemplo
npm run prisma:seed
```

## 🔒 Segurança

⚠️ **Importante**: As credenciais padrão (`postgres/postgres`) são apenas para desenvolvimento local. Nunca use essas credenciais em produção!

Para produção, use:
- Senhas fortes
- Variáveis de ambiente
- Secrets management (AWS Secrets Manager, etc.)

## 📝 Notas

- O volume `postgres_data` persiste os dados mesmo após parar o container
- O healthcheck garante que o banco está pronto antes de aceitar conexões
- O container é configurado para reiniciar automaticamente (`restart: unless-stopped`)

