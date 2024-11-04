export enum Role {
    ADMIN = "admin",
    SIMPLE_USER = "simpleUser",
}

export type UserProps = {
    id: number;
    username: string;
    email: string;
    password: string;
    role: Role;
    banned: boolean;
    createdAt: Date;
    updatedAt: Date;
}


export class User {
    private constructor(private props: UserProps) { };
    public static create(username: string, email: string, password: string, role:Role): User {
        return new User({
            id: 0,
            username,
            email,
            password,
            role,
            banned: false,
            createdAt: new Date(),
            updatedAt: new Date()
        });
    }



    public get id() {
        return this.props.id;
    }

    public get username() {
        return this.props.username;
    }

    public get email() {
        return this.props.email;
    }

    public get password() {
        return this.props.password;
    }

    public get role() {
        return this.props.role;
    }

    public get banned() {
        return this.props.banned;
    }

    public get createdAt() {
        return this.props.createdAt;
    }

    public get updatedAt() {
        return this.props.updatedAt;
    }

public static with(props:UserProps):User{
    return new User(props);
}
public banUser(){
    this.props.banned = !this.props.banned
}

}






