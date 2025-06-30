// App.js
import React, { useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    Grid,
    Container,
    Paper,
} from "@mui/material";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ItemTypes = {
    TASK: "task",
};


const TaskCard = ({ task, fromColumn, handleEditTask, setEnableEditing }) => {
    const [, drag] = useDrag({
        type: ItemTypes.TASK,
        item: { task, fromColumn },
    });

    return (
        <Card
            ref={drag}
            sx={{
                mb: 1.5,
                cursor: "grab",
                boxShadow: 3,
                "&:hover": { backgroundColor: "#f9f9f9" },
            }}
        >
            <CardContent >
                <Typography variant="body1">{task}</Typography>
                <div>
                    <button onClick={() => { handleEditTask(task) }} > Edit </button>
                    <button> Delete</button>
                </div>
            </CardContent>
        </Card>
    );
};

const Column = ({ name, tasks, moveTask, handleAddTask }) => {
    const [taskName, setTaskName] = useState('');
    const [enableEditing, setEnableEditing] = useState(false);
    const [, drop] = useDrop({
        accept: ItemTypes.TASK,
        drop: (item) => {
            if (item.fromColumn !== name) {
                moveTask(item.task, item.fromColumn, name);
            }
        },
    });

    const handleEditTask = (tasktoEdit) => {
        console.log(tasktoEdit);
        setTaskName(tasktoEdit);
        setEnableEditing(true);
    }
    console.log(taskName);
    return (
        <Paper
            ref={drop}
            elevation={4}
            sx={{
                p: 2,
                minHeight: 400,
                backgroundColor: "#f5f5f5",
                borderRadius: 2,
            }}
        >
            <Typography variant="h6" sx={{ mb: 2 }}>
                {name}
            </Typography>
            {name === 'Backlog' &&
                <div>
                    <input type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
                    <button onClick={() => handleAddTask(taskName)}>Add Task</button>
                </div>
            }

            {tasks.map((task, index) => (
                <TaskCard key={index} task={task} fromColumn={name} handleEditTask={handleEditTask} setEnableEditing={setEnableEditing} />
            ))}
        </Paper>
    );
};

export default function App() {
    const [board, setBoard] = useState({
        Backlog: ["Design Login", "Create Wireframes"],
        "In Progress": ["Build Header"],
        Complete: ["Project Setup"],
    });

    const moveTask = (task, from, to) => {
        setBoard((prev) => {
            const updated = { ...prev };
            updated[from] = updated[from].filter((t) => t !== task);
            updated[to] = [...updated[to], task];
            return updated;
        });
    };
    // const handleAddTask = (newtask) => {
    //     // console.log("newtask: ", newtask)
    //     setBoard((prev)=>[...prev, newtask])
    //   }
    const handleAddTask = (newtask) => {
        // console.log("newtask: ", newtask)
        setBoard(prev => ({ ...prev, Backlog: [...prev.Backlog, newtask] }))
    }
    //   const handleAddTasks = (name: string) => {
    //     setBoard(prev => ({
    //         ...prev,
    //         Backlog: [...prev.Backlog, { name }],
    //     }));
    // };

    return (
        <DndProvider backend={HTML5Backend}>
            <Container maxWidth="lg" sx={{ mt: 5 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Kanban Board
                </Typography>
                <Grid container spacing={3}>
                    {Object.entries(board).map(([column, tasks]) => (
                        <Grid item xs={12} md={4} key={column}>
                            <Column name={column} tasks={tasks} moveTask={moveTask} handleAddTask={handleAddTask} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </DndProvider>
    );
}