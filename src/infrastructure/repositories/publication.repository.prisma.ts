import { Publication } from "../../domain/entities/publication.entity";

export interface PublicationRepository{
    findByAuthorId(autorId:number):Promise<Publication[]>;
    save(publication:Publication):Promise<Publication>;
}