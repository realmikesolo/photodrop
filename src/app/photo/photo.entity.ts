import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Album } from '../album/album.entity';

@Entity({ name: 'photos' })
export class Photo extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ nullable: true })
  public relativePath: string;

  @Column()
  public name: string;

  @Column()
  public type: string;

  @Column()
  public phoneNumbers: string;

  @ManyToOne(() => Album, (album) => album.photos)
  public album: Album;
}
