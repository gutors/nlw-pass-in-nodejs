import { prisma } from '../src/lib/prisma'

async function seed() {
    await prisma.event.create({
        data: {
            id: '6d394d80-18de-4cd4-819d-9c7f78476a5c',
            title: 'evento de teste',
            slug: 'evento-de-teste',
            details: 'detalhes do evento',
            maximumAttendees: 100,
        }
    })
}

seed().then(() => {
    console.log('Seeded database')
    prisma.$disconnect()
})