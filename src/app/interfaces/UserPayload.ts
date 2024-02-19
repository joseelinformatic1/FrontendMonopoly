import { JwtPayload, jwtDecode } from "jwt-decode";

export interface UserPayload extends JwtPayload {
    id: number;
    nickname: string;
    nombre: string;
    email: string;
    roles: string[];
}

