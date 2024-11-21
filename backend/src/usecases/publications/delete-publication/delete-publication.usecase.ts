import { PublicationGateway } from "../../../domain/gateways/publication.gateway";
import { DeletePublicationDTO } from "./delete-publication.dto";

export class DeletePublication{

    private publicationRepository:PublicationGateway;
    constructor(publicationRepository: PublicationGateway){
        this.publicationRepository = publicationRepository
    }

public async execute(dto: DeletePublicationDTO, userId: number, userRole: string): Promise<void> {
    const publication = await this.publicationRepository.findById(dto.publicationId);
    if (!publication) {
      throw new Error('Publication not found');
    }

    await this.publicationRepository.delete(dto.publicationId, userId, userRole);
  }
}


