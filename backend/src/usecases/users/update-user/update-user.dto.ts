export interface UpdateUserProfileDTO{
    userId:number;
    username?:string;
    oldPassword?:string;
    newPassword?:string;
}