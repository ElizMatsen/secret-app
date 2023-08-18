export interface SecretRequest {
    id: string,
    title: string,
    body: string
}

export type CreateSecretRequest = Omit<SecretRequest, 'id'>

export interface ShowSecretRequest {
    id?: string,
    email: string,
    password: string
}
