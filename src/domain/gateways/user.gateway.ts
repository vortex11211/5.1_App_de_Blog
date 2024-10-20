import { User } from "../entities/user.entity";

export interface UserGateway {
  save(user: User): Promise<void>;
  findById(id: number): Promise<User | null>;
  list(): Promise<User[]>;
  findByEmail(id: string): Promise<User | null>
}