export interface SecretRequest {
    id: string,
    title: string,
    body: string
}

export interface CreateSecretRequest {
    title: string,
    body: string
}

export interface ShowSecretRequest {
    id?: string,
    email: string,
    password: string
}
