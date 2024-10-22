import { LikePublicationDTO } from './like-publication.dto';
import { LikeGateway } from '../../domain/gateways/like.gateway';
import { Like } from '../../domain/entities/like.entity';

export interface LikePublicationUseCase {
    execute(dto: LikePublicationDTO): Promise<void>;
}

export class LikePublication implements LikePublicationUseCase {
    private likeGateway: LikeGateway;

    constructor(likeGateway: LikeGateway) {
        this.likeGateway = likeGateway;
    }

    public async execute(dto: LikePublicationDTO): Promise<void> {
        const existingLike = await this.likeGateway.findByUserAndPublication(dto.userId, dto.publicationId);

        if (existingLike) {
            // Si ya existe, elimina el like
            await this.likeGateway.deleteByUserAndPublication(dto.userId, dto.publicationId);
        } else {
            // Si no existe, crea un nuevo like
            const like = Like.create(dto.userId, dto.publicationId);
            await this.likeGateway.save(like);
        }
    }
}
