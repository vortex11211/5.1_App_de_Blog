import { Favorite } from "../entities/favorite.entity";

export interface FavoriteGateway{
    save(favorite:Favorite):Promise<void>;
    findByUserAndPublication(userId:number, PublicationId:number):Promise<Favorite | null>;
    deleteByUserAndPublication(userId:number, publicationId:number): Promise<void>;
    countByPublicationId(publicationId:number):Promise<number>
}