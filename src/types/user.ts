export interface User {
    id: string;
    name: string;
    email: string;
    mobile: string;
    role: string | null;
    child: object;
}