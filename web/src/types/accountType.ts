
export enum AccountTypeEnum {
    ADMIN = 'ADMINNISTRATOR',
    USER = 'USER',
}
export interface AccountType {
    id: string
    username: string
    email: string
    type?: AccountTypeEnum
}