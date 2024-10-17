import { Like } from "../entities/like.entity";
export interface LikeGateway{
    save(like:Like):Promise<void>;
    findById(id:number):Promise<Like | null>;
    list():Promise<Like[]>;
}