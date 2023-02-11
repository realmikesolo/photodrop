import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Album } from '../album/album.entity';

@Entity({ name: 'photographers' })
export class Photographer extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({ unique: true })
  public login: string;

  @Column()
  public password: string;

  @Column({ type: 'text', nullable: true })
  public fullname: string | null;

  @Column({ type: 'text', nullable: true })
  public email: string | null;

  @OneToMany(() => Album, (album) => album.photographer)
  public albums: Album[];
}
