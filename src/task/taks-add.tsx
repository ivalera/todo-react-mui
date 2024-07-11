import { useState } from 'react';
import { useTasks, useTasksDispatch } from './tasks-context';
import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { DISPATCH_ERROR, EMPTY_STRING_VALUE, NEW_TASK, NEW_TASK_ERROR } from './constants';

export default function AddTaskForm() {
    const [text, setText] = useState(EMPTY_STRING_VALUE);
    const [labelTask, setLabelTask] = useState(NEW_TASK);
    const [textFieldError, setTextFieldError] = useState(false);
    const tasks = useTasks();
    const dispatch = useTasksDispatch();

    let tasksLength = tasks.length;

    const onAddTask = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(!text.trim()){
            setLabelTask(NEW_TASK_ERROR)
            setTextFieldError(true);
            return;
        }
        setText(EMPTY_STRING_VALUE);
        if (dispatch) {
            dispatch({
                type: 'added',
                id: tasksLength++,
                text: text,
                done: false 
            })
        } else {
            console.error(DISPATCH_ERROR);
        }
    }

    const onChangeTaskText = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(text === EMPTY_STRING_VALUE){
            setLabelTask(NEW_TASK);
            setTextFieldError(false);
        }
        setText(event.target.value);
    } 

    const handleBlur = () => {
        setLabelTask(NEW_TASK);
        setTextFieldError(false);
    };

    return (
        <Box 
            component="form"
            onSubmit={onAddTask}
            display="flex"
            flexDirection="column"
            mx={'auto'}
            p={2}>
                <TextField
                    variant="standard"
                    error={textFieldError}
                    value={text}
                    label={labelTask}
                    onChange={onChangeTaskText}
                    onBlur={handleBlur}
                    InputLabelProps={{
                        shrink: true,
                    }}
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
    );
}