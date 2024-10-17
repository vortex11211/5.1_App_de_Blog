export type LikeProps = {
    id: number;
    userId: number;
    publicationId: number;
    createdAt: Date;
  };
  
  export class Like {
    private constructor(private props: LikeProps) {}
  
    public static create(userId: number, publicationId: number): Like {
      return new Like({
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
  }