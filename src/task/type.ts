type TaskType = {
    id: number;
    text: string;
    done: boolean;
}

type Action = { type: 'added', id: number, text: string, done: boolean } 
           | { type: 'changed', task: TaskType } 
           | { type: 'deleted', id: number }
           | { type: 'initialize', tasks: TaskType[] }

export type { TaskType, Action }