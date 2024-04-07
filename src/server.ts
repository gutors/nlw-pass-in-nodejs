import fastify from 'fastify'
import z from 'zod'
import { PrismaClient } from '@prisma/client'

const app = fastify()

const prisma = new PrismaClient({
    log: ['query']
})

// SOAP, REST, GraphQL, gRPC
// GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS, ...

// Tipos de conexao ao banco de dados
// Driver nativo (conecta e monta as querys - batchs)
// Query Builder (knex.js)
// ORM (Prisma, Sequelize, drizzle, TypeORM)

app.post('/events', async (request, reply) => {
    console.log(request.body)

    const createEventSchema = z.object({
        "title": z.string().min(4).max(255),
        "details": z.string().nullable(),
        "maximumAttendees": z.number().int().positive().max(100).nullable(),
    })

    const data = createEventSchema.parse(request.body)

    console.log(data)

    const event = await prisma.event.create({
        data: {
            title: data.title,
            details: data.details,
            maximumAttendees: data.maximumAttendees,
            slug: new Date().toISOString(),
        }
    })

    // 201 Created
    reply.status(201)

    return { eventId: event.id }
})

app.listen({ port: 3333}).then(() => {
    console.log('Server is running on port 3333')
})