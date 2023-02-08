import { PgErrors } from '@hibanka/pg-utils';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { HttpStatus } from '../../http/status';
import { HttpResponse } from '../../http/type';
import { Env } from '../../shared/env';
import { Photographer } from './photographer.entity';
import {
  IncorrectPassword,
  UserNotFound,
  UserWithSuchLoginAlreadyExistsException,
} from './photographer.exception';
import { PhotographerLoginContext, PhotographerRegisterContext } from './photographer.router';

export class PhotographerService {
  public async register(ctx: PhotographerRegisterContext): Promise<HttpResponse> {
    const { login, password, fullname, email } = ctx;

    const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));

    const photographer = new Photographer();
    photographer.login = login;
    photographer.password = hashedPassword;
    photographer.fullname = fullname ?? null;
    photographer.email = email ?? null;

    try {
      await photographer.save();
    } catch (e) {
      if (e.code === PgErrors.UNIQUE_VIOLATION) {
        throw new UserWithSuchLoginAlreadyExistsException();
      }
      throw e;
    }

    return {
      status: HttpStatus.OK,
      body: { id: photographer.id, success: true },
    };
  }

  public async login(ctx: PhotographerLoginContext): Promise<HttpResponse> {
    const { login, password } = ctx;

    const photographer = await Photographer.findOne({ where: { login } });
    if (!photographer) {
      throw new UserNotFound();
    }

    if (!(await bcrypt.compare(password, photographer.password))) {
      throw new IncorrectPassword();
    }

    const accessToken = this.createToken(photographer.id);

    return {
      status: HttpStatus.OK,
      body: {
        token: accessToken,
        success: true,
      },
    };
  }

  private createToken(photographerId: number): string {
    return jwt.sign({ photographerId }, Env.ACCESS_TOKEN_KEY, { expiresIn: '1d' });
  }
}
