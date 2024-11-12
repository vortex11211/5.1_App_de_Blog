import { Role } from "../../../domain/entities/user.entity";
export interface AuthorizeUserDTO{
    userId:number;
    userRole:Role
    action:string
}