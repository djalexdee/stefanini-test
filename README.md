# Serverless Challenge

## 📋 Descrição

API Serverless desenvolvida com NestJS, Prisma e PostgreSQL para gerenciamento de funcionários. A aplicação segue os princípios de Clean Architecture e inclui autenticação JWT, soft delete, validação de dados, documentação Swagger e testes unitários.

## 🏗️ Arquitetura

A aplicação foi desenvolvida seguindo os princípios de **Clean Architecture**, organizada em camadas:

- **Domain**: Entidades e interfaces de repositórios
- **Application**: Casos de uso (use cases)
- **Infrastructure**: Implementações de repositórios com Prisma
- **Presentation**: Controllers, DTOs, Guards, Middlewares e Services

## 🚀 Tecnologias

- **NestJS**: Framework Node.js
- **TypeScript**: Linguagem de programação
- **Prisma**: ORM para PostgreSQL
- **PostgreSQL**: Banco de dados relacional
- **JWT**: Autenticação com tokens
- **Jest**: Testes unitários
- **Swagger**: Documentação da API
- **Serverless Framework**: Deploy na AWS
- **class-validator**: Validação de dados

## 📦 Instalação

### Pré-requisitos

- Node.js 18.x ou superior
- Docker e Docker Compose (para rodar PostgreSQL localmente)
- npm ou yarn
- Serverless Framework (para desenvolvimento local com serverless-offline)

### Opção 1: Desenvolvimento Local com Docker e Serverless Offline (Recomendado)

Esta é a forma mais fácil de começar, usando Docker para o PostgreSQL e serverless-offline para simular o ambiente Lambda localmente.

1. Clone o repositório:
```bash
git clone <url-do-repositório>
cd stefanini-test
```

2. Configure as variáveis de ambiente:
```bash
cp env.example .env
```

Edite o arquivo `.env` com as configurações para Docker:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/stefanini_db?schema=public"
JWT_SECRET="your-secret-key-change-in-production"
PORT=3000
```

3. Execute o setup completo (instala dependências, sobe o PostgreSQL, executa migrações e popula o banco):
```bash
npm run setup:local
```

Ou faça manualmente:
```bash
# Instalar dependências
npm install

# Gerar o cliente Prisma
npm run prisma:generate

# Subir o PostgreSQL no Docker
npm run docker:up

# Aguardar o banco estar pronto (alguns segundos)
# Executar as migrações
npm run prisma:migrate

# Popular o banco com dados de exemplo (opcional)
npm run prisma:seed
```

4. Inicie a aplicação com serverless-offline:
```bash
npm run start:local
```

Ou use o comando que sobe o Docker e inicia a aplicação:
```bash
npm run dev:local
```

A aplicação estará disponível em `http://localhost:3000`
A documentação Swagger estará disponível em `http://localhost:3000/api`

### Opção 2: Desenvolvimento Local sem Docker

Se você já tem PostgreSQL instalado localmente:

1. Clone o repositório:
```bash
git clone <url-do-repositório>
cd stefanini-test
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp env.example .env
```

Edite o arquivo `.env` com suas configurações:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/stefanini_db?schema=public"
JWT_SECRET="your-secret-key-change-in-production"
PORT=3000
```

4. Configure o banco de dados:
```bash
# Gerar o cliente Prisma
npm run prisma:generate

# Executar as migrações
npm run prisma:migrate

# Popular o banco com dados de exemplo (opcional)
npm run prisma:seed
```

## 🏃 Executando a aplicação

### Modo desenvolvimento com Serverless Offline (Recomendado)

Simula o ambiente Lambda localmente usando serverless-offline:

```bash
# Garante que o Docker está rodando
npm run docker:up

# Inicia a aplicação com serverless-offline
npm run start:local
```

Ou use o comando que faz tudo:
```bash
npm run dev:local
```

### Modo desenvolvimento NestJS padrão
```bash
npm run start:dev
```

### Modo produção
```bash
npm run build
npm run start:prod
```

### Comandos Docker úteis

```bash
# Subir o PostgreSQL
npm run docker:up

# Parar o PostgreSQL
npm run docker:down

# Ver logs do PostgreSQL
npm run docker:logs

# Reiniciar o PostgreSQL
npm run docker:restart
```

A aplicação estará disponível em `http://localhost:3000`
A documentação Swagger estará disponível em `http://localhost:3000/api`

## 📚 Documentação da API

A documentação completa da API está disponível via Swagger em `/api` quando a aplicação estiver rodando.

### Endpoints principais

#### Autenticação

**POST /auth/register**
- Registra um novo usuário
- Body: `{ "email": "user@example.com", "password": "password123", "name": "Nome do Usuário" }`

**POST /auth/login**
- Realiza login e retorna token JWT
- Body: `{ "email": "user@example.com", "password": "password123" }`
- Response: `{ "access_token": "jwt-token" }`

#### Funcionários (requer autenticação)

**POST /employees**
- Cria um novo funcionário
- Headers: `Authorization: Bearer <token>`
- Body: `{ "name": "João Silva", "age": 30, "role": "Desenvolvedor" }`

**GET /employees**
- Lista todos os funcionários
- Headers: `Authorization: Bearer <token>`

**GET /employees/:id**
- Busca um funcionário por ID
- Headers: `Authorization: Bearer <token>`

**PUT /employees/:id**
- Atualiza um funcionário
- Headers: `Authorization: Bearer <token>`
- Body: `{ "name": "João Silva", "age": 31, "role": "Desenvolvedor Senior" }` (todos os campos são opcionais)

**DELETE /employees/:id**
- Remove um funcionário (soft delete)
- Headers: `Authorization: Bearer <token>`

## 🔐 Autenticação

A aplicação utiliza JWT (JSON Web Tokens) para autenticação. Para acessar as rotas protegidas:

1. Registre um usuário em `/auth/register`
2. Faça login em `/auth/login` para obter o token
3. Inclua o token no header: `Authorization: Bearer <token>`

### Decorator @Public()

Rotas marcadas com o decorator `@Public()` não requerem autenticação. Exemplo:
- `/auth/register`
- `/auth/login`

### Guard JWT

O `JwtAuthGuard` protege as rotas que requerem autenticação. O guard valida o token JWT e extrai as informações do usuário.

## 🧪 Testes

### Executar todos os testes
```bash
npm test
```

### Executar testes em modo watch
```bash
npm run test:watch
```

### Executar testes com coverage
```bash
npm run test:cov
```

### Testes unitários

A aplicação inclui testes unitários para os principais casos de uso:
- `CreateEmployeeUseCase`
- `GetAllEmployeesUseCase`
- `GetEmployeeByIdUseCase`
- `RegisterUseCase`

## 🗄️ Banco de Dados

### Modelos

**User**
- `id`: UUID
- `email`: String (único)
- `password`: String (criptografado)
- `name`: String
- `createdAt`: DateTime
- `updatedAt`: DateTime
- `deletedAt`: DateTime? (soft delete)

**Employee**
- `id`: UUID
- `name`: String
- `age`: Int
- `role`: String
- `createdAt`: DateTime
- `updatedAt`: DateTime
- `deletedAt`: DateTime? (soft delete)

### Soft Delete

O Prisma está configurado para utilizar soft delete. Quando um registro é deletado, o campo `deletedAt` é preenchido com a data atual, mas o registro permanece no banco de dados. As consultas filtram automaticamente registros com `deletedAt` não nulo.

### Migrações

```bash
# Criar nova migração
npm run prisma:migrate

# Aplicar migrações
npm run prisma:migrate

# Reverter migração
npx prisma migrate reset
```

## ☁️ Deploy na AWS

### Pré-requisitos

- AWS CLI configurado
- Credenciais AWS configuradas
- Serverless Framework instalado globalmente: `npm install -g serverless`

### Configuração

1. Configure as variáveis de ambiente no `serverless.yml` ou use variáveis de ambiente do sistema

2. Build da aplicação:
```bash
npm run build
```

3. Deploy:
```bash
serverless deploy
```

### Configuração do Banco de Dados na AWS

Recomenda-se usar AWS RDS (PostgreSQL) ou AWS Aurora Serverless para o banco de dados. Configure a variável de ambiente `DATABASE_URL` no Lambda com a conexão do banco.

### Variáveis de Ambiente no Lambda

Configure as seguintes variáveis de ambiente no Lambda:
- `DATABASE_URL`: String de conexão do PostgreSQL
- `JWT_SECRET`: Chave secreta para JWT

## 📁 Estrutura do Projeto

```
stefanini-test/
├── src/
│   ├── domain/                 # Camada de domínio
│   │   ├── entities/          # Entidades
│   │   └── repositories/      # Interfaces de repositórios
│   ├── application/           # Camada de aplicação
│   │   └── use-cases/        # Casos de uso
│   ├── infrastructure/        # Camada de infraestrutura
│   │   ├── database/         # Serviços de banco de dados
│   │   └── repositories/     # Implementações de repositórios
│   └── presentation/         # Camada de apresentação
│       ├── controllers/      # Controllers
│       ├── dto/             # DTOs
│       ├── guards/          # Guards
│       ├── middleware/      # Middlewares
│       ├── services/        # Services
│       └── strategies/      # Estratégias de autenticação
├── prisma/
│   ├── schema.prisma        # Schema do Prisma
│   └── seed.ts             # Seed do banco de dados
├── test/                   # Testes E2E
├── serverless.yml          # Configuração do Serverless
└── README.md              # Documentação
```

## 🔧 Scripts Disponíveis

- `npm run build`: Compila o projeto
- `npm run start`: Inicia a aplicação
- `npm run start:dev`: Inicia em modo desenvolvimento
- `npm run start:prod`: Inicia em modo produção
- `npm test`: Executa testes unitários
- `npm run test:cov`: Executa testes com coverage
- `npm run prisma:generate`: Gera o cliente Prisma
- `npm run prisma:migrate`: Executa migrações
- `npm run prisma:seed`: Popula o banco com dados de exemplo
- `npm run lint`: Executa o linter

## 📝 Observações

- A aplicação utiliza soft delete, então os registros não são removidos permanentemente do banco de dados
- Todas as rotas de funcionários requerem autenticação JWT
- A senha dos usuários é criptografada usando bcrypt
- Os tokens JWT expiram em 1 dia
- A validação de dados é feita usando class-validator

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

## 👤 Autor

Desenvolvido para o desafio Serverless da Stefanini.

---

## ✅ Requisitos Atendidos

- [x] Clean Architecture
- [x] Versionamento no Github
- [x] Documentação completa
- [x] Funcionário com atributos: Id, Idade, Nome e Cargo
- [x] Banco de dados PostgreSQL na AWS
- [x] Lambda com CRUD completo (Create, Read, Update, Delete)
- [x] Acessível via internet
- [x] Serverless Framework para provisionamento
- [x] Testes unitários com Jest
- [x] Autenticação JWT
- [x] Soft delete no Prisma
- [x] Validação de dados com class-validator
- [x] Documentação Swagger
- [x] Decorator para rotas públicas
- [x] Middleware para autenticação
- [x] Docker e Docker Compose para desenvolvimento local
- [x] Serverless Offline para testes locais

## 📖 Documentação Adicional

- [QUICKSTART.md](./QUICKSTART.md) - Guia rápido de início
- [DOCKER.md](./DOCKER.md) - Guia completo de Docker
- [DEPLOY.md](./DEPLOY.md) - Guia de deploy na AWS
- [postman_collection.json](./postman_collection.json) - Collection do Postman para testes
