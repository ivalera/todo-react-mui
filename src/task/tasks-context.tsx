import { Dispatch, createContext, useContext, useEffect, useReducer } from 'react';
import { tasksReducer } from './tasks-reducer';
import { initialTasks } from './tasks-initial';
import { Action } from './type';
import { LOCAL_STORAGE_KEY } from './constants';

type TasksDispatch = Dispatch<Action>;

const TasksContext = createContext(initialTasks);
const TasksDispatchContext = createContext<TasksDispatch | null>(null);

const initialStorageTasks = () => {
    const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedTasks ? JSON.parse(storedTasks) : [];
}

function TasksProvider({children}: {children: React.ReactNode}) {
    const [tasks, dispatch] = useReducer(tasksReducer, [], initialStorageTasks);

    useEffect(() => {
        const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedTasks) {
            dispatch({ type: 'initialize', tasks: JSON.parse(storedTasks) });
        }
    }, []); 

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
    }, [tasks]);

    return (
        <TasksContext.Provider value={tasks}>
            <TasksDispatchContext.Provider value={dispatch}>
                {children}
            </TasksDispatchContext.Provider>
        </TasksContext.Provider>
    );
}

function useTasks() {
    return useContext(TasksContext);
}

function useTasksDispatch() {
    return useContext(TasksDispatchContext);
}

export { TasksProvider, useTasks, useTasksDispatch };