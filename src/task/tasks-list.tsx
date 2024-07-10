import { List, ListItem, Typography } from "@mui/material";
import Task from "./task-element";
import { useTasks } from "./tasks-context";

export default function TaskList() {
    const tasks = useTasks();

    const planTasks = tasks.filter(element => !element.done)
    const readyTasks = tasks.filter(element => element.done)

    console.log(tasks);
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