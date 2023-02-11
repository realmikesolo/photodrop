import { FastifyReply, FastifyRequest } from 'fastify';
import { JwtPayload, verify } from 'jsonwebtoken';
import { Env } from '../shared/env';
import { UnauthorizedException } from './exception';

export async function verifyJWT(req: FastifyRequest, res: FastifyReply, done): Promise<void> {
  try {
    const [type, token] = (req.headers.authorization ?? '').split(' ');

    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException();
    }

    const { photographerId } = verify(token, Env.JWT_SECRET_KEY) as JwtPayload;
    req['photographerId'] = photographerId;

    done();
  } catch (e) {
    console.error(e);

    throw new UnauthorizedException();
  }
}

export type AuthRequest = FastifyRequest & { photographerId: number };
