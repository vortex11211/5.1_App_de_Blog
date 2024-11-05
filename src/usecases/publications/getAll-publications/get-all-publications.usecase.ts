import { PublicationGateway } from "../../../domain/gateways/publication.gateway";
import { Publication } from "../../../domain/entities/publication.entity";

export interface GetAllPublicationsUseCase {
    execute(): Promise<Publication[]>;
}

export class GetAllPublications implements GetAllPublicationsUseCase {
    private publicationGateway: PublicationGateway;

    constructor(publicationGateway: PublicationGateway) {
        this.publicationGateway = publicationGateway;
    }

    async execute(): Promise<Publication[]> {
        const publications = await this.publicationGateway.list();
        publications.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()); // Ordenar por fecha de creación
        return publications;
    }
}
