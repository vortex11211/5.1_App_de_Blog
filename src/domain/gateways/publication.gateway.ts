import { Publication } from "../entities/publication.entity";
export interface PublicationGateway{
    save(publication:Publication):Promise<void>;
    findById(id:number):Promise<Publication | null>;
    list():Promise<Publication[]>
    findByTitle(title:string):Promise<Publication[] | null>;
}