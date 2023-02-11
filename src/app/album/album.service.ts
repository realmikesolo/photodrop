import { BadRequestException } from '../../http/exception';
import { HttpStatus } from '../../http/status';
import { HttpResponse } from '../../http/type';
import { Album } from './album.entity';
import { AlbumCreateAlbumContext } from './album.router';

export class AlbumService {
  public async createAlbum(ctx: AlbumCreateAlbumContext): Promise<HttpResponse> {
    const { name, location, date } = ctx;

    if (!(new Date(date).getTime() > 0)) {
      throw new BadRequestException();
    }

    const album = await Album.save({
      name,
      location,
      date: new Date(date).toISOString(),
      photographer: { id: ctx.photographerId },
    });

    return {
      status: HttpStatus.OK,
      body: {
        id: album.id,
        success: true,
      },
    };
  }
}
