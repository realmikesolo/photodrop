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
    super(HttpStatus.OK, { message: 'BAD_REQUEST', success: false });
  }
}

export class InternalServerErrorException extends HttpException {
  constructor() {
    super(HttpStatus.OK, { message: 'INTERNAL_SERVER_ERROR', success: false });
  }
}
