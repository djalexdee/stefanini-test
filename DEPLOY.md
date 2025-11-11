# Guia de Deploy

## Pré-requisitos

- Node.js 18.x ou superior
- PostgreSQL 14 ou superior
- AWS CLI configurado
- Serverless Framework instalado globalmente
- Conta AWS com permissões adequadas

## Configuração Local

1. Instale as dependências:
```bash
npm install
```

2. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

3. Edite o arquivo `.env` com suas configurações:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/stefanini_db?schema=public"
JWT_SECRET="your-secret-key-change-in-production"
PORT=3000
```

4. Execute as migrações:
```bash
npm run prisma:migrate
```

5. (Opcional) Popule o banco com dados de exemplo:
```bash
npm run prisma:seed
```

6. Inicie a aplicação:
```bash
npm run start:dev
```

## Deploy na AWS

### 1. Configurar Banco de Dados na AWS

Recomenda-se usar AWS RDS (PostgreSQL) ou AWS Aurora Serverless.

1. Crie uma instância RDS PostgreSQL
2. Configure o security group para permitir conexões
3. Anote a connection string

### 2. Configurar Variáveis de Ambiente

No arquivo `serverless.yml`, configure as variáveis de ambiente ou use AWS Systems Manager Parameter Store:

```yaml
environment:
  DATABASE_URL: ${ssm:/stefanini/database_url}
  JWT_SECRET: ${ssm:/stefanini/jwt_secret}
```

### 3. Build da Aplicação

```bash
npm run build:serverless
```

### 4. Deploy

```bash
serverless deploy
```

### 5. Verificar Deploy

Após o deploy, você receberá uma URL da API Gateway. Teste a API:

```bash
curl https://your-api-id.execute-api.us-east-1.amazonaws.com/dev/api
```

## Configuração do Prisma no Lambda

O Prisma Client precisa ser gerado antes do deploy. O script `build:serverless` já faz isso automaticamente.

Certifique-se de que o Prisma Client está incluído no pacote Lambda. O `serverless.yml` já está configurado para incluir os arquivos necessários.

## Troubleshooting

### Erro de Conexão com Banco de Dados

- Verifique se o security group do RDS permite conexões do Lambda
- Verifique se a connection string está correta
- Verifique se o banco de dados está acessível via internet (se necessário)

### Erro de Memória no Lambda

- Aumente o `memorySize` no `serverless.yml`
- Otimize o código para usar menos memória

### Erro de Timeout

- Aumente o `timeout` no `serverless.yml`
- Otimize as queries do banco de dados
- Use connection pooling

## Monitoramento

Use AWS CloudWatch para monitorar:
- Logs do Lambda
- Métricas de performance
- Erros e exceções

## Atualização

Para atualizar a aplicação:

1. Faça as alterações necessárias
2. Execute o build:
```bash
npm run build:serverless
```

3. Faça o deploy:
```bash
serverless deploy
```

## Rollback

Para fazer rollback de uma versão anterior:

```bash
serverless deploy --version <version>
```

Ou use o AWS Console para reverter para uma versão anterior do Lambda.

