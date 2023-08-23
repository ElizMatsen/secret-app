export interface LoginRequest {
    email: string,
    password: string
}

export interface AccessToken {
    accessToken: string | null
}

export interface User {
    id: string,
    createdAt: string,
    email: string,
}
