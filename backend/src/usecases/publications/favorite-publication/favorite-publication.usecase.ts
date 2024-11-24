import { FavoritePublicationDTO } from './favorite-publication.dto';
import { FavoriteGateway } from '../../../domain/gateways/favorite.gateway';
import { Favorite } from '../../../domain/entities/favorite.entity';

export interface FavoritePublicationUseCase {
    execute(dto: FavoritePublicationDTO): Promise<void>;
}

export class FavoritePublication implements FavoritePublicationUseCase {
    private favoriteGateway: FavoriteGateway;

    constructor(favoriteGateway: FavoriteGateway) {
        this.favoriteGateway = favoriteGateway;
    }

    public async execute(dto: FavoritePublicationDTO): Promise<void> {
        const existingLike = await this.favoriteGateway.findByUserAndPublication(dto.userId, dto.publicationId);

        if (existingLike) {

            await this.favoriteGateway.deleteByUserAndPublication(dto.userId, dto.publicationId);
        } else {
            const favorite = Favorite.create(dto.userId, dto.publicationId);
            await this.favoriteGateway.save(favorite);
        }
    }
}
