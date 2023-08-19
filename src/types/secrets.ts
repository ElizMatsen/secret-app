export interface SecretResponse {
    id: string,
    title: string,
    body: string
}

export type CreateSecretRequest = Omit<SecretResponse, 'id'>

export interface ShowSecretRequest {
    id: string,
    email: string,
    password: string
}
