import { User } from "../entities/user.entity";

export interface UserGateway {
  save(user: User): Promise<void>;
  findById(id: number): Promise<User | null>;
  list(): Promise<User[]>;
  findByEmail(id: string): Promise<User | null>
  findByUsername(username:string):Promise<User | null>
  banUser(user:User):Promise<void>;
  count(): Promise<number>;
  update(user:User):Promise<void>;
}