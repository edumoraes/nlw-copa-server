//setup do servidor
import Fastify from 'fastify'
import cors from '@fastify/cors'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import ShortUniqueId from 'short-unique-id'

const prisma = new PrismaClient({
  //imprime log de todas as queryes que a aplicação faz
  log: ['query']
})

//declaração da primeira função a ser executada pelo servidor
async function bootstrap() {
  const fastify = Fastify({
    //Essa propriedade permite ao fastify enviar logs de tudo que está ocorrendo na aplicação
    logger: true
  })

  //configuração de cors
  await fastify.register(cors, {
    //está permitindo qualquer aplicação acessar o backend
    origin: true
  })

  /*primeira rota da aplicação:
  o primeiro parâmetro é o caminho
  o segundo é uma função anonima nesse caso
  toda consulta SQL é uma promise "promessa"
  a fução anonima deve ser async "asincrona"
  a consulta realizada deve ser await "aguardada"*/
  fastify.get('/pools/count', async () => {
    const count = await prisma.pool.count()
    return { count }
  })

  fastify.get('/users/count', async () => {
    const count = await prisma.user.count()
    return { count }
  })

  fastify.get('/guesses/count', async () => {
    const count = await prisma.guess.count()
    return { count }
  })

  fastify.post('/pools', async (request, reply) => {
    const createPollBody = z.object({
      title: z.string()
    })
    const { title } = createPollBody.parse(request.body)

    const generate = new ShortUniqueId({ length: 6 })

    const code = String(generate()).toUpperCase()

    await prisma.pool.create({
      data: {
        title,
        code
      }
    })

    return reply.status(201).send({ code })
  })

  //configuração host para facilitar consumo da aplicação no react e react native
  await fastify.listen({ port: 3333, host: '0.0.0.0' })
}

//chamada da função principal
bootstrap()
