import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import Fastify from 'fastify';
import { photographerRouter } from './photographer/photographer.router';

export async function startServer(port: number): Promise<void> {
  const fastify = Fastify({ logger: true }).withTypeProvider<TypeBoxTypeProvider>();

  fastify.register(photographerRouter);

  await fastify.listen({ port });

  console.log(`Server has started on ${port} port`);
}

export type HttpResponse = {
  status: number;
  body: Record<string, any>;
};
