export class Employee {
  id: string;
  name: string;
  age: number;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;

  constructor(
    id: string,
    name: string,
    age: number,
    role: string,
    createdAt: Date,
    updatedAt: Date,
    deletedAt?: Date | null,
  ) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.role = role;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }
}

