import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { AuthRequest, verifyJWT } from '../../http/auth';
import { responseSchema } from '../../http/response';
import { AlbumService } from './album.service';

const AlbumSchema = Type.Object({
  name: Type.String(),
  location: Type.String(),
  date: Type.String(),
});

const albumService = new AlbumService();

export async function albumRouter(fastify: FastifyInstance): Promise<void> {
  fastify.post<{ Body: Static<typeof AlbumSchema> }>(
    '/album/upload',
    {
      schema: AlbumCreateAlbumSchema,
      preHandler: [verifyJWT],
    },
    async (req, res) => {
      const { status, body } = await albumService.createAlbum({
        ...req.body,
        photographerId: (req as AuthRequest).photographerId,
      });
      return res.status(status).send(body);
    },
  );
}

export const AlbumCreateAlbumSchema = {
  body: AlbumSchema,
  response: {
    200: responseSchema({
      id: Type.Optional(Type.Number()),
    }),
  },
};

export type AlbumCreateAlbumContext = Static<typeof AlbumCreateAlbumSchema['body']> & {
  photographerId: number;
};
