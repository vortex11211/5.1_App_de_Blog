export interface RegisterUserDTO {
    username: string;
    email: string;
    password: string;
    role: string;
    adminKey?:string;
}
