# Dockerfile para desenvolvimento local
FROM node:18-alpine

WORKDIR /app

# Instala dependências do sistema necessárias para o Prisma
RUN apk add --no-cache openssl libc6-compat

# Copia os arquivos de dependências
COPY package*.json ./
COPY prisma ./prisma/

# Instala dependências
RUN npm ci

# Gera o Prisma Client
RUN npx prisma generate

# Copia o restante dos arquivos
COPY . .

# Build da aplicação
RUN npm run build

# Expõe a porta
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "run", "start:prod"]

