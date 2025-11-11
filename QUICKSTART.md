# 🚀 Guia Rápido de Início

## Setup Completo em 3 Passos

### 1. Instalar Dependências e Configurar Ambiente

```bash
# Copiar arquivo de ambiente
cp env.example .env

# Instalar dependências
npm install
```

### 2. Configurar Banco de Dados com Docker

```bash
# Opção A: Setup automático (recomendado)
npm run setup:local

# Opção B: Manual
npm run docker:up
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

### 3. Iniciar Aplicação com Serverless Offline

```bash
# Inicia Docker e aplicação
npm run dev:local

# OU apenas a aplicação (se Docker já estiver rodando)
npm run start:local
```

## ✅ Verificar se está funcionando

1. Acesse a documentação Swagger: http://localhost:3000/api
2. Teste o endpoint de registro: `POST http://localhost:3000/auth/register`
3. Faça login: `POST http://localhost:3000/auth/login`
4. Use o token para acessar os endpoints de funcionários

## 📝 Credenciais Padrão (Seed)

Após executar `npm run prisma:seed`, você pode usar:

- **Email**: admin@example.com
- **Senha**: admin123

## 🐛 Problemas Comuns

### Porta 5432 já em uso
Altere a porta no `docker-compose.yml` e atualize o `.env`

### Docker não está rodando
Certifique-se de que o Docker Desktop está iniciado

### Erro de conexão com banco
Aguarde alguns segundos após `docker:up` para o banco estar pronto

## 📚 Próximos Passos

- Leia o [README.md](./README.md) para documentação completa
- Consulte [DOCKER.md](./DOCKER.md) para mais informações sobre Docker
- Veja [DEPLOY.md](./DEPLOY.md) para instruções de deploy

