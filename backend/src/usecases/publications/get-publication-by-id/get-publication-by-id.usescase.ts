import { GetPublicationByIdDTO } from './get-publication-by-id.dto';
import { PublicationGateway } from '../../../domain/gateways/publication.gateway';
import { Publication } from '../../../domain/entities/publication.entity';

export class GetPublicationByIdUseCase {
    private publicationGateway: PublicationGateway;

    constructor(publicationGateway: PublicationGateway) {
        this.publicationGateway = publicationGateway;
    }

    public async execute(dto: GetPublicationByIdDTO): Promise<Publication | null> {
        return this.publicationGateway.findById(dto.publicationId);
    }
}
