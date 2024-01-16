import { Task } from "./task";
export interface UserTask {
    id: number | undefined;
    task: Task
    user: any
    done: boolean
    active: boolean;
}