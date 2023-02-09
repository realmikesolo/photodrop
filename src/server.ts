import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import { photographerRouter } from './app/photographer/photographer.router';
import { BadRequestException, HttpException, InternalServerErrorException } from './http/exception';
import { HttpStatus } from './http/status';

export async function startServer(port: number): Promise<void> {
  const fastify = Fastify({ logger: true }).withTypeProvider<TypeBoxTypeProvider>();

  fastify.setErrorHandler(httpErrorHandler).setNotFoundHandler(httpNotFoundHandler);
  fastify.register(photographerRouter);

  await fastify.listen({ port, host: '0.0.0.0' });

  console.log(`Server has started on ${port} port`);
}

export const httpErrorHandler = (error: any, req: FastifyRequest, res: FastifyReply): void => {
  if (error instanceof HttpException) {
    res.status(error.status).send(error.body);
  } else if (error.validation || error.status === HttpStatus.BAD_REQUEST) {
    console.warn(error.validation ?? error);

    const exception = new BadRequestException();
    res.status(exception.status).send(exception.body);
  } else {
    console.error(error);

    const exception = new InternalServerErrorException();
    res.status(exception.status).send(exception.body);
  }
};

export const httpNotFoundHandler = (req: FastifyRequest, res: FastifyReply): void => {
  res.status(HttpStatus.NOT_FOUND).send({ code: 'ROUTE_NOT_FOUND' });
};
