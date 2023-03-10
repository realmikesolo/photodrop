import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { responseSchema } from '../../http/response';
import { PhotographerService } from './photographer.service';

const photographerService = new PhotographerService();

const UserSchema = Type.Object({
  login: Type.String(),
  password: Type.String(),
  fullname: Type.Optional(Type.String()),
  email: Type.Optional(Type.String()),
});

export async function photographerRouter(fastify: FastifyInstance): Promise<void> {
  fastify.post<{ Body: Static<typeof UserSchema> }>(
    '/photographer/register',
    {
      schema: PhotographerRegisterSchema,
    },
    async (req, res) => {
      const { status, body } = await photographerService.register(req.body);
      return res.status(status).send(body);
    },
  );

  fastify.post<{ Body: Static<typeof UserSchema> }>(
    '/photographer/login',
    {
      schema: PhotographerLoginSchema,
    },
    async (req, res) => {
      const { status, body } = await photographerService.login(req.body);
      return res.status(status).send(body);
    },
  );
}

export const PhotographerRegisterSchema = {
  body: UserSchema,
  response: {
    200: responseSchema({
      id: Type.Optional(Type.Number()),
    }),
  },
};

export const PhotographerLoginSchema = {
  body: Type.Pick(UserSchema, ['login', 'password']),
  response: {
    200: responseSchema({
      token: Type.Optional(Type.String()),
    }),
  },
};

export type PhotographerRegisterContext = Static<(typeof PhotographerRegisterSchema)['body']>;

export type PhotographerLoginContext = Static<(typeof PhotographerLoginSchema)['body']>;
