export class User {
  id: string;
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;

  constructor(
    id: string,
    email: string,
    password: string,
    name: string,
    createdAt: Date,
    updatedAt: Date,
    deletedAt?: Date | null,
  ) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }
}

