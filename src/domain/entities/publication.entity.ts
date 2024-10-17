export type PublicationProps = {
    id: number;
    title: string;
    content: string;
    authorId: number;
    createdAt: Date;
    updatedAt: Date
}

export class Publication {
    private constructor(private props: PublicationProps) { };
    public static create(title: string, content: string, authorId: number): Publication {
        return new Publication({

            id: 0,
            title,
            content,
            authorId,
            createdAt: new Date(),
            updatedAt: new Date(),
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
}


