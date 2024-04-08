import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function registerForEvent(app: FastifyInstance) {
    app
        .withTypeProvider<ZodTypeProvider>()
        .post('/events/:eventId/attendees', {
            schema: {
                params: z.object({
                    eventId: z.string().uuid()
                }),
                body: z.object({
                    "name": z.string().min(4).max(255),
                    "email": z.string().email(),
                }),
                response: {
                    201: z.object({
                        attendeeId: z.number().int()
                    })
                },
            },
        }, async (request, reply) => {
            const { eventId } = request.params
            const { name, email } = request.body

            const attendeeIsAlreadyRegistered = await prisma.attendee.findUnique({
                where: {
                    eventId_email: { email, eventId }
                }
            })

            if (attendeeIsAlreadyRegistered !== null) {
                throw new Error('Attendee email is already registered for this event')
            }

            // execute both queries in parallel
            const [event, amountOfAttendeesForEvent] = await Promise.all([
                prisma.event.findUnique({
                    where: {
                        id: eventId
                    }
                }),
                prisma.attendee.count({
                    where: {
                        eventId
                    }
                })
            ])

            if (event?.maximumAttendees && amountOfAttendeesForEvent >= event.maximumAttendees) {
                throw new Error('Maximum number of attendees for this event has been reached')
            }
            
            const attendee = await prisma.attendee.create({
                data: {
                    name,
                    email,
                    eventId
                }
            })

            return reply.status(201).send({ attendeeId: attendee.id })
        })
}