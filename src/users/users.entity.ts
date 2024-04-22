import { Role } from 'src/enums';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  EntityManager,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column({ type: String, nullable: false })
  username: string;

  @Column({ type: String, nullable: false })
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  roles: Role[];
}
