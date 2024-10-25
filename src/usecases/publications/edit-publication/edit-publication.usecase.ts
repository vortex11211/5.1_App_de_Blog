import { PublicationGateway } from "../../../domain/gateways/publication.gateway";
import { EditPublicationDTO } from "./edit-publication.dto";
import { Publication } from "../../../domain/entities/publication.entity";

export class EditPublication {
    private publicationRepository: PublicationGateway;

    constructor(publicationRepository: PublicationGateway) {
        this.publicationRepository = publicationRepository;
    }

    async execute(dto: EditPublicationDTO): Promise<Publication> {
        const publication = await this.publicationRepository.findById(dto.publicationId);
        if (!publication) {
            throw new Error("Publication not found");
        }
        // Actualizar los campos opcionales
        if (dto.title !== undefined) {
            publication.updateTitle(dto.title);
        }
        if (dto.content !== undefined) {
            publication.updateContent(dto.content);
        }

        await this.publicationRepository.save(publication);

        return publication;
    }
}
