import { useState } from "react";
import { useTasksDispatch } from "./tasks-context";
import { Checkbox, IconButton, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import { TaskType } from "./type";

const DISPATCH_ERROR = 'Dispatch function is not available.'; 

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
        <>
            <Checkbox
                checked={task.done}
                onChange={(e) => onChangeCheсked(e.target.checked)}
            />
            {isEditing ? ( 
                <EditText task={task} onChange={onChangeText} setIsEditing={setIsEditing}/>  
            ) : ( 
                <>
                    <ShowEditedText task={task} setIsEditing={setIsEditing} isReady={isReady}/>
                    <IconButton onClick={() => onDelete(task)}>
                        <DeleteIcon sx={{ color:'#cc4200' }} />
                    </IconButton> 
                </> 
            )}
        </>
    );
}


interface EditTextProps {
    task: TaskType;
    onChange: (newText: string) => void;
    setIsEditing: (isEditing: boolean) => void;
}

function EditText({task, onChange, setIsEditing}: EditTextProps){
    return(
        <>
            <TextField
                variant="standard"
                label={'Имя задачи'}
                multiline
                value={task.text}
                onChange={(e) => onChange(e.target.value)} />
            <IconButton onClick={() => setIsEditing(false)}>
                <DoneIcon color={'primary'} />
            </IconButton>
        </>

    )
}

interface ShowEditTextProps {
    task: TaskType;
    setIsEditing: (isEditing: boolean) => void;
    isReady: boolean;
}

function ShowEditedText({task, setIsEditing, isReady}: ShowEditTextProps){
    return(
        <>
            {task.text}
            {isReady && 
                <IconButton onClick={() => setIsEditing(true)}>
                    <EditIcon color={'primary'} />
                </IconButton>
            }
        </>
    )
}