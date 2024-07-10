import { Container } from '@mui/material'
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
                        xs: '320px',    // 0px - 600px
                        sm: '460px',     // 600px - 960px
                        md: '600px',     // 960px - 1280px
                        lg: '980px',     // 1280px - 1920px
                        xl: '980px'      // 1920px и выше
                    },
                    maxWidth: 'none'
                }}>
                <TasksProvider>
                    <AddTaskForm/>
                    <TaskList/>
                </TasksProvider>
            </Container>
        </>
    )
}

export default App
