import { Request } from "express";
import { UserPayload } from "./userPayload";

export interface AuthRequest extends Request{
    userData?: UserPayload
}