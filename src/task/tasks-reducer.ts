import { Action, TaskType } from "./type";

function tasksReducer(tasks: TaskType[], action: Action) {  
    switch (action.type) {
        case 'added': {
            return [...tasks, {
                id: action.id,
                text: action.text,
                done: false
            }];
        }
        case 'changed': {
            return tasks.map(task => {
                if (task.id === action.task.id) {
                    return action.task;
                }
                return task;
            });
        }
        case 'deleted': {
            return tasks.filter(task => task.id !== action.id);
        }
        default: 
            return tasks;
    }
}

export { tasksReducer };