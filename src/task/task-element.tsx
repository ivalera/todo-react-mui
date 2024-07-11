import { useState } from "react";
import { useTasksDispatch } from "./tasks-context";
import { Box, Checkbox, IconButton, TextField, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import { TaskType } from "./type";
import { DELETE_ICON_COLOR, DISPATCH_ERROR, NAME_TASK } from "./constants";

type TaskProps = {
    task: TaskType;
    isReady: boolean;
};

export default function Task({ task, isReady }: TaskProps) {
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useTasksDispatch();

    function onChangeText(newText: string){
        if (dispatch) {
            dispatch({
                type: 'changed',
                task: {
                ...task,
                text: newText
                }
            });
        } else {
            console.error(DISPATCH_ERROR);
        }
    }
    
    function onChangeCheсked(checked: boolean){
        if (dispatch) {
            dispatch({
                type: 'changed',
                task: {
                    ...task,
                    done: checked
                }
            });
        } else {
            console.error(DISPATCH_ERROR);
        }
    }
    
    function onDelete(taskDelete: TaskType){
        if (dispatch) {
            dispatch({
                type: 'deleted',
                id: taskDelete.id
            });
        } else {
            console.error(DISPATCH_ERROR);
        }
    }

    return (
        <Box 
            display="flex" 
            alignItems="center" 
            width="100%">
            <Checkbox sx={{ flexGrow: 0 }}
                checked={task.done}
                onChange={(e) => onChangeCheсked(e.target.checked)}
            />
            {isEditing ? ( 
                <EditText 
                    task={task} 
                    onChange={onChangeText} 
                    setIsEditing={setIsEditing}/>  
            ) : ( 
                <>
                    <ShowEditedText 
                        task={task} 
                        setIsEditing={setIsEditing} 
                        isReady={isReady}/>
                    <IconButton onClick={() => onDelete(task)}>
                        <DeleteIcon sx={{ color: DELETE_ICON_COLOR }} />
                    </IconButton> 
                </> 
            )}
        </Box>
    );
}


interface EditTextProps {
    task: TaskType;
    onChange: (newText: string) => void;
    setIsEditing: (isEditing: boolean) => void;
}

function EditText({task, onChange, setIsEditing}: EditTextProps) {
    return(
        <Box 
            display="flex" 
            flexGrow={1} 
            alignItems="center">
            <TextField
                sx={{ flexGrow: 1, marginRight: 1 }}
                variant="standard"
                label={NAME_TASK}
                multiline
                value={task.text}
                onChange={(e) => onChange(e.target.value)} />
            <IconButton onClick={() => setIsEditing(false)}>
                <DoneIcon color={'primary'} />
            </IconButton>
        </Box>

    )
}

interface ShowEditTextProps {
    task: TaskType;
    setIsEditing: (isEditing: boolean) => void;
    isReady: boolean;
}

function ShowEditedText({task, setIsEditing, isReady}: ShowEditTextProps) {
    return(
        <Box 
            display="flex" 
            flexGrow={1} 
            alignItems="center">
            <Typography 
                sx={{ flexGrow: 1, marginRight: 1 }} 
                component="p">
                {task.text}
            </Typography>
            {isReady && 
                <IconButton onClick={() => setIsEditing(true)}>
                    <EditIcon color={'primary'} />
                </IconButton>
            }
        </Box>
    )
}