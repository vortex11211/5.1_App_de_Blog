import { PublicationGateway } from "../../../domain/gateways/publication.gateway";
import { Publication } from "../../../domain/entities/publication.entity";
import { UserGateway } from "../../../domain/gateways/user.gateway";
import { FavoriteGateway } from "../../../domain/gateways/favorite.gateway";

export interface GetAllPublicationsUseCase {
    execute(userRole: string): Promise<Publication[]>;
}

export class GetAllPublications implements GetAllPublicationsUseCase {
    private publicationGateway: PublicationGateway;
    private userGateway: UserGateway;
    private favoriteGateway: FavoriteGateway;

    constructor(publicationGateway: PublicationGateway, userGateway:UserGateway,favoriteGateway:FavoriteGateway) {
        this.publicationGateway = publicationGateway;
        this.userGateway=userGateway;
        this.favoriteGateway=favoriteGateway
    }

    async execute(userRole: string): Promise<Publication[]> {
        let publications = await this.publicationGateway.list();
        const totalUsers=await this.userGateway.count();

        if (userRole !== 'admin') {
            publications = publications.filter(publication => !publication.deleted)
        }
        for(const publication of publications){ 
            const likes=await this.favoriteGateway.countByPublicationId(publication.id);
            const popularity =  likes/(totalUsers-1);
            publication.popularity=(popularity*100).toFixed(2);
        }


        publications.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()); // Ordenar por fecha de creación
        return publications;
    }
}
