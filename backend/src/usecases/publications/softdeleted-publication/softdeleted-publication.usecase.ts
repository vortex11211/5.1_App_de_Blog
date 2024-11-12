import { PublicationGateway } from "../../../domain/gateways/publication.gateway";
import { SoftDeletePublicationDTO } from "./softdeleted-publication.dto";
import { Publication } from "../../../domain/entities/publication.entity";

export interface SoftDeletePublicationUseCase {
    execute(dto: SoftDeletePublicationDTO): Promise<Publication>;
}

export class SoftDeletePublication implements SoftDeletePublicationUseCase {
    private publicationGateway: PublicationGateway;

    constructor(publicationGateway: PublicationGateway) {
        this.publicationGateway = publicationGateway;
    }

    async execute(dto: SoftDeletePublicationDTO): Promise<Publication> {
        const publication = await this.publicationGateway.findById(dto.publicationId);
        if (!publication) {
            throw new Error("Publication not found");
        }
        publication.softDelete(); // Este método debe alternar el estado de eliminado
        await this.publicationGateway.softDelete(publication); // Guarda el estado actualizado de la publicación
        return publication;
    }
}