export interface Task {
    id: number | undefined;
    name: string;
    description: string;
    expValue: number;
    active: boolean;
}