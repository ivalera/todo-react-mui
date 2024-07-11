import { Action, TaskType } from "./type";

function tasksReducer(tasks: TaskType[], action: Action) {
    switch (action.type) {
        case 'initialize':
            return action.tasks;
        case 'added': {
            return [...tasks, {
                id: action.id,
                text: action.text,
                done: false
            }];
        }
        case 'changed': {
            return tasks.map(t => {
                if (t.id === action.task.id) {
                    return action.task;
                } else {
                    return t;
                }
            });
        }
        case 'deleted': {
            return tasks.filter(t => t.id !== action.id);
        }
        default: 
            return tasks;
    }
}

export { tasksReducer };