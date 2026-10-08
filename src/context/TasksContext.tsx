
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';

export type Task = {
  id: string;
  title: string;
  completed: boolean;
};

type TasksContextType = {
  tasks: Task[];
  addTask: (title: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
};

const TasksContext = createContext<TasksContextType | undefined>(
  undefined
);

export function TasksProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [tasks, setTasks] = useState<Task[]>([]);

  function addTask(title: string) {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
    };

    setTasks((previousTasks) => [...previousTasks, newTask]);
  }

  function toggleTask(id: string) {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function deleteTask(id: string) {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== id)
    );
  }

  return (
    <TasksContext.Provider
      value={{ tasks, addTask, toggleTask, deleteTask }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TasksContext);

  if (!context) {
    throw new Error(
      'useTasks must be used inside TasksProvider'
    );
  }

  return context;
}