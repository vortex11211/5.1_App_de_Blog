Ajuste de la Entidad Favorite
Vamos a centralizar la lógica de manejo de favoritos en la entidad Favorite.

favorite.entity.ts
Primero, asegúrate de que la entidad Favorite esté configurada correctamente:

typescript
export type FavoriteProps = {
    id: number;
    userId: number;
    publicationId: number;
    createdAt: Date;
};

export class Favorite {
    private constructor(private props: FavoriteProps) { }

    public static create(userId: number, publicationId: number): Favorite {
        return new Favorite({
            id: 0,
            userId,
            publicationId,
            createdAt: new Date(),
        });
    }

    public get id() {
        return this.props.id;
    }

    public get userId() {
        return this.props.userId;
    }

    public get publicationId() {
        return this.props.publicationId;
    }

    public get createdAt() {
        return this.props.createdAt;
    }

    public static with(props: FavoriteProps): Favorite {
        return new Favorite(props);
    }
}
Ajuste del Caso de Uso para Obtener el Porcentaje de Popularidad
get-all-publications.usecase.ts
Vamos a ajustar el caso de uso para calcular el porcentaje de popularidad de cada publicación utilizando la entidad Favorite.

typescript
import { PublicationGateway } from "../../../domain/gateways/publication.gateway";
import { UserGateway } from "../../../domain/gateways/user.gateway";
import { FavoriteGateway } from "../../../domain/gateways/favorite.gateway";
import { Publication } from "../../../domain/entities/publication.entity";

export interface GetAllPublicationsUseCase {
    execute(userRole: string): Promise<Publication[]>;
}

export class GetAllPublications implements GetAllPublicationsUseCase {
    private publicationGateway: PublicationGateway;
    private userGateway: UserGateway;
    private favoriteGateway: FavoriteGateway;

    constructor(publicationGateway: PublicationGateway, userGateway: UserGateway, favoriteGateway: FavoriteGateway) {
        this.publicationGateway = publicationGateway;
        this.userGateway = userGateway;
        this.favoriteGateway = favoriteGateway;
    }

    async execute(userRole: string): Promise<Publication[]> {
        let publications = await this.publicationGateway.list();
        const totalUsers = await this.userGateway.count(); // Obtener el total de usuarios

        // Filtrar publicaciones según el rol del usuario
        if (userRole !== 'admin') {
            publications = publications.filter(publication => !publication.deleted);
        }

        // Calcular el porcentaje de popularidad
        for (const publication of publications) {
            const likes = await this.favoriteGateway.countByPublicationId(publication.id);
            const popularity = likes / (totalUsers - 1);
            publication.popularity = (popularity * 100).toFixed(2); // Calcular el porcentaje de popularidad
        }

        publications.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()); // Ordenar por fecha de creación
        return publications;
    }
}
Ajuste del Repositorio de Favoritos
favorite.repository.prisma.ts
Añadir un método para contar los favoritos por publicación.

typescript
import { FavoriteGateway } from "../../domain/gateways/favorite.gateway";
import prisma from './prismaClient';
import { Favorite } from "../../domain/entities/favorite.entity";

export class FavoriteRepositoryPrisma implements FavoriteGateway {
    // Otros métodos...

    public async countByPublicationId(publicationId: number): Promise<number> {
        const count = await prisma.favorite.count({
            where: { publicationId }
        });
        return count;
    }
}
Verificación Final
Con estos ajustes, tu aplicación debería calcular y devolver el porcentaje de popularidad de cada publicación basado en la cantidad de favoritos y la cantidad de usuarios existentes menos uno. Prueba estos cambios y dime cómo te va. ¡Vamos a resolverlo! 😊