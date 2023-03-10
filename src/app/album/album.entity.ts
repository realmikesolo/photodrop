import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Photo } from '../photo/photo.entity';
import { Photographer } from '../photographer/photographer.entity';

@Entity({ name: 'albums' })
export class Album extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column()
  public name: string;

  @Column()
  public location: string;

  @Column({ type: 'timestamp' })
  public date: string;

  @ManyToOne(() => Photographer, (photographer) => photographer.albums)
  public photographer: Photographer;

  @OneToMany(() => Photo, (photo) => photo.album)
  public photos: Photo[];
}
