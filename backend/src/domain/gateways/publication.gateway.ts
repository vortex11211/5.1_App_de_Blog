import { Publication } from "../entities/publication.entity";
export interface PublicationGateway{
    save(publication:Publication):Promise<void>;
    update(publication:Publication):Promise<void>;
    findById(id:number):Promise<Publication | null>;
    list():Promise<Publication[]>;
    findByTitle(title:string):Promise<Publication[] | null>;
    softDelete(publication:Publication):Promise<void>;
    delete(id:number):Promise<void>;
    findByUserIdWithDeleted(id:number):Promise<Publication[]>
}