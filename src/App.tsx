import { Container, Typography } from '@mui/material'
import './App.css'
import AddTaskForm from './task/taks-add';
import { TasksProvider } from './task/tasks-context';
import TaskList from './task/tasks-list';

function App() {

    return (
        <>  
            <Container 
                sx={{
                    border: '1px dashed grey',
                    color: 'black', 
                    width: {
                        xs: '320px',
                        sm: '460px',
                        md: '600px',
                        lg: '980px',
                        xl: '980px'
                    },
                    maxWidth: 'none'
                }}>
                <Typography 
                    variant="h3"
                    textAlign={'left'}
                    color={'#1976d2'} 
                    gutterBottom
                    sx={{ mt: 4 }}>
                    TODO
                </Typography>
                <TasksProvider>
                    <AddTaskForm/>
                    <TaskList/>
                </TasksProvider>
            </Container>
        </>
    )
}

export default App
