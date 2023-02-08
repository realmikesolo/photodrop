import { HttpStatus } from './status';

export class HttpException extends Error {
  public readonly status: number;
  public readonly body: object;

  constructor(status: number, body: object) {
    super('HttpException');

    this.status = status;
    this.body = body;
  }
}

export class BadRequestException extends HttpException {
  constructor() {
    super(HttpStatus.BAD_REQUEST, { code: 'BAD_REQUEST' });
  }
}

export class InternalServerErrorException extends HttpException {
  constructor() {
    super(HttpStatus.INTERNAL_SERVER_ERROR, { code: 'INTERNAL_SERVER_ERROR' });
  }
}
