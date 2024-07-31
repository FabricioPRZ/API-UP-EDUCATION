export interface  User{
    user_id : number | null;
    name : string;
    second_name : string;
    last_name_paternal: string;
    last_name_maternal: string;
    role_name:string;
    pdf:string;
    email : string;
    password : string;
    created_at: String;
    created_by: string;
    updated_at: String;
    updated_by: string;
    deleted: boolean;
}