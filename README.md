# pass.in

O pass.in é uma aplicação de **gestão de participantes em eventos presenciais**. 

A ferramenta permite que o organizador cadastre um evento e abra uma página pública de inscrição.

Os participantes inscritos podem emitir uma credencial para check-in no dia do evento.

O sistema fará um scan da credencial do participante para permitir a entrada no evento.

## Requisitos

### Requisitos funcionais

- [x] O organizador deve poder cadastrar um novo evento;
- [x] O organizador deve poder visualizar dados de um evento;
- [x] O organizador deve poser visualizar a lista de participantes; 
- [x] O participante deve poder se inscrever em um evento;
- [x] O participante deve poder visualizar seu crachá de inscrição;
- [x] O participante deve poder realizar check-in no evento;

### Regras de negócio

- [x] O participante só pode se inscrever em um evento uma única vez;
- [x] O participante só pode se inscrever em eventos com vagas disponíveis;
- [x] O participante só pode realizar check-in em um evento uma única vez;

### Requisitos não-funcionais

- [x] O check-in no evento será realizado através de um QRCode;

## Documentação da API (Swagger)

Para documentação da API, acesse o link: https://nlw-unite-nodejs.onrender.com/docs

## Banco de dados

Nessa aplicação vamos utilizar banco de dados relacional (SQL). Para ambiente de desenvolvimento seguiremos com o SQLite pela facilidade do ambiente.

## Instalação
Para instalar é necessário ter o nvm e o node (v.20) instalados:

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
nvm install 20

## Configurando dependencias desenvolvimento
npm i typescript @types/node -D (suporte a typescript)
npm i tsx -D (tsx = typescript execute)
npm i fastify (microframework p/ http requests, ex: Express.js, Koa JS)
npm i prisma (orm p/ banco)
npm i zod
npm i fastify-type-provider-zod
npm i @fastify/swagger
npm i @fastify/swagger-ui
npm i @fastify/cors
npm i tsup -D (ts para js - build da aplicacao)

npx tsc --init (cria tsconfig.json)
npx tsc (converte typescript para js)
npx tsx src/server.ts (converte e executa)
npx tsx watch src/server.ts (converte e executa sem parar)
npx prisma init --datasource-provider SQLite
npx prisma migrate dev (cria migracao com alteracoes)
npx prisma studio (app para gerenciar db)
npx prisma db seed (popula o bd)

## Deploy
Para subir a aplicação, executar:

node src/server.js (sobe o server)

### Diagrama ERD

<img src=".github/erd.svg" width="600" alt="Diagrama ERD do banco de dados" />

### Estrutura do banco (SQL)

```sql
-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "details" TEXT,
    "slug" TEXT NOT NULL,
    "maximum_attendees" INTEGER
);

-- CreateTable
CREATE TABLE "attendees" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "attendees_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "check_ins" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "attendeeId" INTEGER NOT NULL,
    CONSTRAINT "check_ins_attendeeId_fkey" FOREIGN KEY ("attendeeId") REFERENCES "attendees" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "events_slug_key" ON "events"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "attendees_event_id_email_key" ON "attendees"("event_id", "email");

-- CreateIndex
CREATE UNIQUE INDEX "check_ins_attendeeId_key" ON "check_ins"("attendeeId");
```
## Expansões
Como possíveis expansões do projeto, fica as seguintes sugestões:

- Substituir o node.js por deno ou bun;
- Utilizar nanoid para acessar dados dos parcitipantes

## Anotações
SOAP, REST, GraphQL, gRPC
GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS, ...

Tipos de conexao ao banco de dados
Driver nativo (conecta e monta as querys - batchs)
Query Builder (knex.js)
ORM (Prisma, Sequelize, drizzle, TypeORM)

20x - Sucesso
30x - Redirecionamento
40x - Cliente errou
50x - Servidor errou