import { useState } from 'react';
import { useTasks, useTasksDispatch } from './tasks-context';
import { Box, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function AddTaskForm() {
    const [text, setText] = useState('');
    const tasks = useTasks();
    const dispatch = useTasksDispatch();

    let tasksLength = tasks.length;

    const onAddTask = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(!text.trim()){
            return;
        }
        setText('');
        if (dispatch) {
            dispatch({
                type: 'added',
                id: tasksLength++,
                text: text,
                done: false 
            })
        } else {
            console.error('Dispatch function is not available.');
        }
    }

    const onChangeTaskText = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    } 

  return (
    <>  
        <Box 
            component="form"
            onSubmit={onAddTask}
            display="flex"
            flexDirection="column"
            mx={'auto'}
            textAlign={'left'}
            p={2}
            gap={2}>
            <Typography color={'#1976d2'} variant="h3" gutterBottom>
                TODO
            </Typography>
                <TextField
                    value={text}
                    label={'Имя новой задачи'}
                    variant='standard'
                    onChange={onChangeTaskText}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton type="submit" edge="end">
                                    <AddIcon color={'primary'} />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />   
        </Box>
    </>
  );
}