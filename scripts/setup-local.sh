#!/bin/bash

set -e

echo "🚀 Iniciando setup local..."

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verifica se o Docker está rodando
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker não está rodando. Por favor, inicie o Docker e tente novamente."
    exit 1
fi

echo -e "${YELLOW}📦 Instalando dependências...${NC}"
npm install

echo -e "${YELLOW}🔧 Gerando Prisma Client...${NC}"
npm run prisma:generate

echo -e "${YELLOW}🐳 Subindo PostgreSQL no Docker...${NC}"
npm run docker:up

echo -e "${YELLOW}⏳ Aguardando PostgreSQL estar pronto...${NC}"
# Aguarda o PostgreSQL estar pronto
max_attempts=30
attempt=0
while [ $attempt -lt $max_attempts ]; do
    if docker exec stefanini-postgres pg_isready -U postgres > /dev/null 2>&1; then
        echo -e "${GREEN}✅ PostgreSQL está pronto!${NC}"
        break
    fi
    attempt=$((attempt + 1))
    echo "Aguardando... ($attempt/$max_attempts)"
    sleep 2
done

if [ $attempt -eq $max_attempts ]; then
    echo "❌ PostgreSQL não ficou pronto a tempo."
    exit 1
fi

echo -e "${YELLOW}📊 Executando migrações...${NC}"
npm run prisma:migrate

echo -e "${YELLOW}🌱 Populando banco com dados de exemplo...${NC}"
npm run prisma:seed

echo -e "${GREEN}✅ Setup completo!${NC}"
echo -e "${GREEN}Para iniciar a aplicação, execute: npm run start:local${NC}"

