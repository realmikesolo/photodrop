import { BadRequestException } from '../../http/exception';
import { HttpStatus } from '../../http/status';
import { HttpResponse } from '../../http/type';
import { Album } from './album.entity';
import { AlbumNotFound } from './album.exception';
import { AlbumCreateAlbumContext, AlbumGetAlbumContext, AlbumGetAlbumsContext } from './album.router';

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

  public async getAlbums(ctx: AlbumGetAlbumsContext): Promise<HttpResponse> {
    const albums = await Album.find({
      where: {
        photographer: { id: ctx.photographerId },
      },
    });

    return {
      status: HttpStatus.OK,
      body: {
        albums,
        success: true,
      },
    };
  }

  public async getAlbum(ctx: AlbumGetAlbumContext): Promise<HttpResponse> {
    const album = await Album.findOne({ where: { photographer: { id: ctx.photographerId }, id: ctx.id } });
    if (!album) {
      throw new AlbumNotFound();
    }

    return {
      status: HttpStatus.OK,
      body: {
        album,
        success: true,
      },
    };
  }
}
