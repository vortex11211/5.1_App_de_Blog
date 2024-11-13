import { GetUserPublicationsDTO } from './get-user-publications.dto';
import { PublicationGateway } from '../../../domain/gateways/publication.gateway';
import { UserGateway } from '../../../domain/gateways/user.gateway';
import { FavoriteGateway } from '../../../domain/gateways/favorite.gateway';
import { Publication } from '../../../domain/entities/publication.entity';

export interface GetUserPublicationsUseCase {
    execute(dto: GetUserPublicationsDTO): Promise<Publication[]>;
}

export class GetUserPublications implements GetUserPublicationsUseCase {
    private publicationGateway: PublicationGateway;
    private userGateway: UserGateway;
    private favoriteGateway: FavoriteGateway;

    constructor(publicationGateway: PublicationGateway, userGateway: UserGateway, favoriteGateway: FavoriteGateway) {
        this.publicationGateway = publicationGateway;
        this.userGateway = userGateway;
        this.favoriteGateway = favoriteGateway;
    }

    async execute(dto: GetUserPublicationsDTO): Promise<Publication[]> {
        const publications = await this.publicationGateway.findByUserIdWithDeleted(dto.userId);
        const totalUsers = await this.userGateway.count();

        const publicationsWithAutors = await Promise.all(publications.map(async (publication) => {
            const likes = await this.favoriteGateway.countByPublicationId(publication.id);
            const popularity = likes / (totalUsers - 1);
            publication.popularity = (popularity * 100).toFixed(2);
            const author = await this.userGateway.findById(publication.authorId);
            publication.authorName = author ? author.username : 'Unknown';
            return publication;
        }));
        publications.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()); // Ordenar por fecha de creación
        return publications;
    }
}
