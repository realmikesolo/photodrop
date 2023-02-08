import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'photographers' })
export class Photographer extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  public login: string;

  @Column({ type: 'varchar', length: 255 })
  public password: string;

  @Column({ type: 'varchar', nullable: true })
  public fullname: string | null;

  @Column({ type: 'varchar', nullable: true })
  public email: string | null;
}
