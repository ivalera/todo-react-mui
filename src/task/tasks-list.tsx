import { List, ListItem, Typography } from "@mui/material";
import Task from "./task-element";
import { useTasks } from "./tasks-context";
import { useEffect, useState } from "react";
import { TaskType } from "./type";

export default function TaskList() {
    const tasks = useTasks();
    const [planTasks, setPlanTasks] = useState<TaskType[]>([]);
    const [readyTasks, setReadyTasks] = useState<TaskType[]>([]);   

    useEffect(() => {
        setPlanTasks(tasks.filter(task => !task.done));
        setReadyTasks(tasks.filter(task => task.done).reverse());
    }, [tasks]);

    return (
        <> 
            {planTasks.length > 0 ? (
                <>
                    <Typography component="p">План {`(${planTasks.length})`}</Typography>
                    <List>
                        {planTasks.map((task) => (
                            <ListItem key={task.id}>
                                <Task isReady={true} task={task} />
                            </ListItem>
                        ))}
                    </List>
                </>
            ) : (
                <Typography 
                    variant="h6" 
                    marginTop={'20px'} 
                    marginBottom={'20px'}>
                        Задач нет
                </Typography>
            )}

            {readyTasks.length > 0 &&
                 <>
                 <Typography component="p">Готово {`(${readyTasks.length})`}</Typography>
                 <List>
                     {readyTasks.map((task) => (
                         <ListItem key={task.id}>
                             <Task isReady={false} task={task} />
                         </ListItem>
                     ))}
                 </List>
             </>
            }
        </>
    )
}