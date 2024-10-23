export type FavoriteProps = {
    id: number;
    userId: number;
    publicationId: number;
    createdAt: Date;
  };
  
  export class Favorite {
    private constructor(private props: FavoriteProps) {}
  
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