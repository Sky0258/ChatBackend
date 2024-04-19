export interface messageRecord {
    id: string,
    content: string,
    createdAt: string,
    user: {
        id: string,
        name: string,
        imageUrl: string
    }
}