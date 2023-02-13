import { HttpException } from '../../http/exception';
import { HttpStatus } from '../../http/status';

export class AlbumNotFound extends HttpException {
  constructor() {
    super(HttpStatus.OK, { message: 'ALBUM_NOT_FOUND', success: false });
  }
}
