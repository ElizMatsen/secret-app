export interface LoginRequest {
    email: string,
    password: string
}

export interface AccessToken {
    accessToken: string | null
}

export interface User {
    createdAt: string,
    email: string,
    id: string,
}
