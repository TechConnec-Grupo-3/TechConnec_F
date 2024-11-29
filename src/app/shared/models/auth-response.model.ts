export interface AuthResponse {
    id: number;
    token: string;
    firstName: string;
    lastName: string | null;
    role: 'USER' | 'ADMIN';
}
