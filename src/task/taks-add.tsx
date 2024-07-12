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

    const onAddTask = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(!text.trim()){
            setLabelTask(NEW_TASK_ERROR)
            setTextFieldError(true);
            return;
        }

        if (dispatch) {
            dispatch({
                type: 'added',
                id: tasks.length,
                text: text,
                done: false 
            })
            setText(EMPTY_STRING_VALUE);
        } else {
            console.error(DISPATCH_ERROR);
        }
    };

    const handleFocus = () => {
        setTextFieldError(false);
        setLabelTask(NEW_TASK);
    };
    
    const handleBlur = () => {
        setTextFieldError(false); 
        
    };

    const onChangeTaskText = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(!text.trim()) {
            setLabelTask(NEW_TASK);
            setTextFieldError(false);
        }
        setText(event.target.value);
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
                    onFocus={handleFocus}
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
                        ),
                        sx: {
                            "& input:-internal-autofill-selected": {
                                WebkitBoxShadow: "0 0 0 1000px #93ad89 inset", 
                                WebkitTextFillColor: "black",
                            },
                            '& input:-webkit-autofill': {
                                '-webkit-box-shadow': '0 0 0 30px #93ad89 inset !important',
                                '-webkit-text-fill-color': 'black !important',
                            },
                            '& .MuiInputBase-input': {
                                '&:-webkit-autofill': {
                                    boxShadow: '0 0 0 30px #93ad89 inset',
                                    WebkitTextFillColor: 'black',
                                },
                            },
                        },
                    }}
                />   
        </Box>
    );
}