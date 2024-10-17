import { Publication } from "../entities/publication.entity";
export interface PublicationGateway{
    save(publication:Publication):Promise<void>;
    findById(id:string):Promise<Publication | null>;
    list():Promise<Publication[]>
}