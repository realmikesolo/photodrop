import { HttpException } from '../../http/exception';
import { HttpStatus } from '../../http/status';

export class UserWithSuchLoginAlreadyExistsException extends HttpException {
  constructor() {
    super(HttpStatus.CONFLICT, { message: 'USER_WITH_SUCH_LOGIN_ALREADY_EXISTS', success: false });
  }
}

export class UserNotFound extends HttpException {
  constructor() {
    super(HttpStatus.NOT_FOUND, { message: 'USER_NOT_FOUND', success: false });
  }
}

export class IncorrectPassword extends HttpException {
  constructor() {
    super(HttpStatus.FORBIDDEN, { message: 'INCORRECT_PASSWORD', success: false });
  }
}
