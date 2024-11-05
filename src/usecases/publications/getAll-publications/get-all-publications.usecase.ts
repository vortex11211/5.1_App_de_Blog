import { PublicationGateway } from "../../../domain/gateways/publication.gateway";
import { Publication } from "../../../domain/entities/publication.entity";

export interface GetAllPublicationsUseCase {
    execute(userRole:string): Promise<Publication[]>;
}

export class GetAllPublications implements GetAllPublicationsUseCase {
    private publicationGateway: PublicationGateway;

    constructor(publicationGateway: PublicationGateway) {
        this.publicationGateway = publicationGateway;
    }

    async execute(userRole:string): Promise<Publication[]> {
        let publications = await this.publicationGateway.list();
if(userRole !=='admin'){
    publications= publications.filter(publication=>!publication.deleted)
}
        publications.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()); // Ordenar por fecha de creación
        return publications;
    }
}
