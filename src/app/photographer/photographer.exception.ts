import { HttpException } from '../../http/exception';
import { HttpStatus } from '../../http/status';

export class UserWithSuchLoginAlreadyExistsException extends HttpException {
  constructor() {
    super(HttpStatus.CONFLICT, { code: 'USER_WITH_SUCH_LOGIN_ALREADY_EXISTS' });
  }
}

export class UserNotFound extends HttpException {
  constructor() {
    super(HttpStatus.NOT_FOUND, { code: 'USER_NOT_FOUND' });
  }
}

export class IncorrectPassword extends HttpException {
  constructor() {
    super(HttpStatus.FORBIDDEN, { code: 'INCORRECT_PASSWORD' });
  }
}
