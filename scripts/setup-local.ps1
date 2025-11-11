# Script de setup para Windows PowerShell

Write-Host "🚀 Iniciando setup local..." -ForegroundColor Cyan

# Verifica se o Docker está rodando
try {
    docker info | Out-Null
} catch {
    Write-Host "❌ Docker não está rodando. Por favor, inicie o Docker e tente novamente." -ForegroundColor Red
    exit 1
}

Write-Host "📦 Instalando dependências..." -ForegroundColor Yellow
npm install

Write-Host "🔧 Gerando Prisma Client..." -ForegroundColor Yellow
npm run prisma:generate

Write-Host "🐳 Subindo PostgreSQL no Docker..." -ForegroundColor Yellow
npm run docker:up

Write-Host "⏳ Aguardando PostgreSQL estar pronto..." -ForegroundColor Yellow
# Aguarda o PostgreSQL estar pronto
$maxAttempts = 30
$attempt = 0
$ready = $false

while ($attempt -lt $maxAttempts -and -not $ready) {
    try {
        docker exec stefanini-postgres pg_isready -U postgres | Out-Null
        if ($LASTEXITCODE -eq 0) {
            $ready = $true
            Write-Host "✅ PostgreSQL está pronto!" -ForegroundColor Green
        }
    } catch {
        # Continua tentando
    }
    
    if (-not $ready) {
        $attempt++
        Write-Host "Aguardando... ($attempt/$maxAttempts)"
        Start-Sleep -Seconds 2
    }
}

if (-not $ready) {
    Write-Host "❌ PostgreSQL não ficou pronto a tempo." -ForegroundColor Red
    exit 1
}

Write-Host "📊 Executando migrações..." -ForegroundColor Yellow
npm run prisma:migrate

Write-Host "🌱 Populando banco com dados de exemplo..." -ForegroundColor Yellow
npm run prisma:seed

Write-Host "✅ Setup completo!" -ForegroundColor Green
Write-Host "Para iniciar a aplicação, execute: npm run start:local" -ForegroundColor Green

