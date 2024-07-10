import { Dispatch, createContext, useContext, useReducer } from 'react';
import { tasksReducer } from './tasks-reducer';
import { initialTasks } from './tasks-initial';
import { Action } from './type';

type TasksDispatch = Dispatch<Action>;

const TasksContext = createContext(initialTasks);
const TasksDispatchContext = createContext<TasksDispatch | null>(null);

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, dispatch] = useReducer(
    tasksReducer,
    initialTasks
  );

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}

export function useTasks() {
  return useContext(TasksContext);
}

export function useTasksDispatch() {
  return useContext(TasksDispatchContext);
}
