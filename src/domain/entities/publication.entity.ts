export type PublicationProps = {
    id: number;
    title: string;
    content: string;
    authorId: number;
    createdAt: Date;
    updatedAt: Date;
    deleted:Boolean;
    popularity?:string
}

export class Publication {;
    private constructor(private props: PublicationProps) { };
    public static create(title: string, content: string, authorId: number): Publication {
        return new Publication({

            id: 0,
            title,
            content,
            authorId,
            createdAt: new Date(),
            updatedAt: new Date(),
            deleted:false
        });
    }

    public get id() {
        return this.props.id;
    }

    public get title() {
        return this.props.title;
    }

    public get content() {
        return this.props.content;
    }

    public get authorId() {
        return this.props.authorId;
    }

    public get createdAt() {
        return this.props.createdAt;
    }

    public get updatedAt() {
        return this.props.updatedAt;
    }

    public get deleted() {
        return this.props.deleted;
    }

    public get popularity(){
        return this.props.popularity;
    }
    
    public set popularity(value:string | undefined){
        this.props.popularity=value;
    }

    public updateTitle(title:string){
        this.props.title = title;
        this.props.updatedAt= new Date();
    }
    public updateContent(content:string){
        this.props.content = content;
        this.props.updatedAt= new Date();
    }
    public softDelete() {
        this.props.deleted= !this.props.deleted
        this.props.updatedAt = new Date();
    }


    public static with(props:PublicationProps):Publication{
        return new Publication(props);
    }
}


