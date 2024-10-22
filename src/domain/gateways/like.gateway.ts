import { Like } from "../entities/like.entity";

export interface LikeGateway{
    save(like:Like):Promise<void>;
    findByUserAndPublication(userId:number, PublicationId:number):Promise<Like | null>;
    deleteByUserAndPublication(userId:number, publicationId:number): Promise<void>;
}