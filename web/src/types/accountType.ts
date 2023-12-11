
export enum AccountTypeEnum {
    ADMIN = 'ADMINISTRATOR',
    USER = 'USER',
}
export interface AccountType {
    id: string
    username: string
    email: string
    type?: AccountTypeEnum
}