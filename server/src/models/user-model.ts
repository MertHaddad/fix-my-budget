import {
  Table,
  Column,
  Model,
  PrimaryKey,
  CreatedAt,
  UpdatedAt,
  AutoIncrement,
} from 'sequelize-typescript';

/*
interface UserI {
    id?: number;
    name: string;
    email: string;
    password: string;
    createdAt?: any;
    updatedAt?: any;
 }*/

@Table
export class User extends Model<User> {
    @PrimaryKey
    @AutoIncrement
    @Column
  id?: number;

  @Column
  name!: string;

  @Column
  email!: string;

  @Column
  password!: string;

  @CreatedAt
  @Column
  createdAt?: Date;

  @UpdatedAt
  @Column
  updatedAt?: Date;
}
