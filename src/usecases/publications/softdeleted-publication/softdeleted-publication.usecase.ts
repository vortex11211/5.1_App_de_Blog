import { PublicationGateway } from "../../../domain/gateways/publication.gateway";
import { SoftDeletePublicationDTO } from "./softdeleted-publication.dto";
import { Publication } from "../../../domain/entities/publication.entity";

export class SoftDeletePublication {
    private publicationRepository: PublicationGateway;

    constructor(publicationRepository: PublicationGateway) {
        this.publicationRepository = publicationRepository;

    }

    async execute(dto: SoftDeletePublicationDTO): Promise<Publication> {
        const publication = await this.publicationRepository.findById(dto.publicationId);
        if (!publication) {
            throw new Error("Publication not found");
        }
        publication.softDelete();
        await this.publicationRepository.update(publication);
        return publication;
    }

}