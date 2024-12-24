export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    provider: string | null;
    provider_id: string | null;
    avatar: string | null;
    created_at: string;
    updated_at: string;
}

export interface Article {
    id: number;
    title: string;
    article: string;
    tanggal: string;
    user_id: number;
    created_at: string;
    updated_at: string;
    user: User;
}
