import { PostPublicationDTO } from "./post-publication.dto";
import { PublicationGateway } from "../../domain/gateways/publication.gateway";
import { Publication } from "../../domain/entities/publication.entity";
export interface PostPublicationUseCase {
    execute(dto: PostPublicationDTO): Promise<Publication>;
}
export class PostPublication implements PostPublicationUseCase {
    private publicationGateway: PublicationGateway;
    
    constructor(publicationGateway: PublicationGateway) {
        this.publicationGateway = publicationGateway;
    }
    
    public async execute(dto: PostPublicationDTO): Promise<Publication> {
        const publication = Publication.create(dto.title, dto.content, dto.authorId);
        await this.publicationGateway.save(publication);
        return publication;
    }
}
