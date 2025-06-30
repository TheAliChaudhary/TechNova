import Layout from '../../components/Layout';
// App.js
import React, { useState, useCallback } from "react";
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
import { withAuth } from '@/components/withAuth';

const ItemTypes = {
    TASK: "task",
};

type Task = { name: string };
type BoardType = {
    Backlog: Task[];
    "In Progress": Task[];
    Complete: Task[];
};

type TaskCardProps = {
    task: Task;
    fromColumn: keyof BoardType;
    onUpdateTask: (oldName: string, newName: string, column: keyof BoardType) => void;
    onDeleteTask: (name: string, column: keyof BoardType) => void;
};

type ColumnProps = {
    name: keyof BoardType;
    tasks: Task[];
    moveTask: (task: Task, from: keyof BoardType, to: keyof BoardType) => void;
    onAddTask?: (name: string) => void;
    onUpdateTask: (oldName: string, newName: string, column: keyof BoardType) => void;
    onDeleteTask: (name: string, column: keyof BoardType) => void;
};

const initialBoard: BoardType = {
    Backlog: [
        { name: "Design Login" },
        { name: "Create Wireframes" },
    ],
    "In Progress": [
        { name: "Build Header" },
    ],
    Complete: [
        { name: "Project Setup" },
    ],
};

const TaskCard: React.FC<TaskCardProps> = ({ task, fromColumn, onUpdateTask, onDeleteTask }) => {
    const [, drag] = useDrag({
        type: ItemTypes.TASK,
        item: { task, fromColumn },
    });
    const [enableEditing, setEnableEditing] = useState(false);
    const [editValue, setEditValue] = useState(task.name);

    // Use callback ref for MUI compatibility
    const cardRef = useCallback((node: HTMLDivElement | null) => {
        if (node) drag(node);
    }, [drag]);

    return (
        <Card
            ref={cardRef}
            sx={{
                mb: 1.5,
                cursor: "grab",
                boxShadow: 3,
                "&:hover": { backgroundColor: "#f9f9f9" },
            }}
        >
            <CardContent>
                {enableEditing ? (
                    <>
                        <input
                            type="text"
                            value={editValue}
                            onChange={e => setEditValue(e.target.value)}
                            style={{ marginRight: 8 }}
                        />
                        <button
                            onClick={() => {
                                setEnableEditing(false);
                                onUpdateTask(task.name, editValue, fromColumn);
                            }}
                        >
                            Save
                        </button>
                    </>
                ) : (
                    <Typography variant="body1">{task.name}</Typography>
                )}
                <div>
                    <button onClick={() => setEnableEditing(true)}>Edit</button>
                    <button onClick={() => onDeleteTask(task.name, fromColumn)}>Delete</button>
                </div>
            </CardContent>
        </Card>
    );
};

const Column: React.FC<ColumnProps> = ({ name, tasks, moveTask, onAddTask, onUpdateTask, onDeleteTask }) => {
    const [taskName, setTaskName] = useState("");
    const [, drop] = useDrop({
        accept: ItemTypes.TASK,
        drop: (item: { task: Task; fromColumn: keyof BoardType }) => {
            if (item.fromColumn !== name) {
                moveTask(item.task, item.fromColumn, name);
            }
        },
    });

    // Use callback ref for MUI compatibility
    const paperRef = useCallback((node: HTMLDivElement | null) => {
        if (node) drop(node);
    }, [drop]);

    return (
        <Paper
            ref={paperRef}
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
            {onAddTask && (
                <div>
                    <input
                        type="text"
                        value={taskName}
                        onChange={e => setTaskName(e.target.value)}
                    />
                    <button
                        onClick={() => {
                            if (taskName.trim()) {
                                onAddTask(taskName);
                                setTaskName("");
                            }
                        }}
                    >
                        Add Task
                    </button>
                </div>
            )}
            {tasks.map((task) => (
                <TaskCard
                    key={task.name}
                    task={task}
                    fromColumn={name}
                    onUpdateTask={onUpdateTask}
                    onDeleteTask={onDeleteTask}
                />
            ))}
        </Paper>
    );
};

// function TaskPage() {
    const TaskPage: React.FC = () => {
    const [board, setBoard] = useState<BoardType>(initialBoard);

    const moveTask = (task: Task, from: keyof BoardType, to: keyof BoardType) => {
        setBoard(prev => {
            const updated = { ...prev };
            updated[from] = updated[from].filter(t => t.name !== task.name);
            updated[to] = [...updated[to], task];
            return updated;
        });
    };

    const handleAddTask = (name: string) => {
        setBoard(prev => ({
            ...prev,
            Backlog: [...prev.Backlog, { name }],
        }));
    };

    const onUpdateTask = (oldName: string, newName: string, column: keyof BoardType) => {
        setBoard(prev => {
            const updated = { ...prev };
            updated[column] = updated[column].map(t =>
                t.name === oldName ? { ...t, name: newName } : t
            );
            return updated;
        });
    };

    const onDeleteTask = (name: string, column: keyof BoardType) => {
        setBoard(prev => {
            const updated = { ...prev };
            updated[column] = updated[column].filter(t => t.name !== name);
            return updated;
        });
    };

    return (
        <Layout>
            <DndProvider backend={HTML5Backend}>
                <Container maxWidth="lg" sx={{ mt: 5 }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Kanban Board
                    </Typography>
                    <Grid container spacing={3}>
                        {Object.entries(board).map(([column, tasks]) => (
                            <Grid key={column}>
                                <Column
                                    name={column as keyof BoardType}
                                    tasks={tasks}
                                    moveTask={moveTask}
                                    onAddTask={column === "Backlog" ? handleAddTask : undefined}
                                    onUpdateTask={onUpdateTask}
                                    onDeleteTask={onDeleteTask}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </DndProvider>
        </Layout>
    );
};

export default TaskPage;
// export default withAuth(TaskPage); 