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
      preHandler: [verifyJWT],    },
    async (req, res) => {
      const { status, body } = await albumService.createAlbum({
        ...req.body,
        photographerId: (req as AuthRequest).photographerId,
      });
      return res.status(status).send(body);
    },
  );

  fastify.get(
    '/album/allByUser',
    {
      schema: AlbumGetAlbumsSchema,
      preHandler: [verifyJWT],
    },
    async (req, res) => {
      const { status, body } = await albumService.getAlbums({
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

export const AlbumGetAlbumsSchema = {
  response: {
    200: responseSchema({
      albums: Type.Optional(
        Type.Array(
          Type.Object({
            id: Type.Number(),
            name: Type.String(),
            location: Type.String(),
            date: Type.String(),
          }),
        ),
      ),
    }),
  },
};

export type AlbumCreateAlbumContext = Static<typeof AlbumCreateAlbumSchema['body']> & {
  photographerId: number;
};

export type AlbumGetAlbumsContext = {
  photographerId: number;
};
