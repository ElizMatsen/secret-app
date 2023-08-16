export interface SecretType {
    id?: string,
    title: string,
    body: string
}

export interface ShowSecretRequest {
    id?: string,
    email: string,
    password: string
}
