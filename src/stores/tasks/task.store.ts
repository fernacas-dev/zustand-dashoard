import { create, StateCreator } from "zustand";
import { Task, TaskStatus } from "../../interfaces";
import { devtools } from "zustand/middleware";

interface TaskState {
  draggingTaskId?: string;
  tasks: Record<string, Task>;
  getTaskStatus: (status: TaskStatus) => Task[];
  setDraggingTaskId: (taskId: string) => void;
  removingDraggingTaskId: () => void;
  changeTaskStatus: (taskId: string, status: TaskStatus) => void;
  onTaskDrop: (status: TaskStatus) => void;
}

const storeAPI: StateCreator<TaskState> = (set, get) => ({
  draggingTaskId: undefined,
  tasks: {
    "ABC-1": { id: "ABC-1", title: "Task 1", status: "open" },
    "ABC-2": { id: "ABC-2", title: "Task 2", status: "in-progress" },
    "ABC-3": { id: "ABC-3", title: "Task 3", status: "open" },
    "ABC-4": { id: "ABC-4", title: "Task 4", status: "open" },
  },
  getTaskStatus: (status: TaskStatus) => {
    const tasks = get().tasks;
    return Object.values(tasks).filter((task) => task.status === status);
  },
  setDraggingTaskId: (draggingTaskId: string) => {
    set({ draggingTaskId: draggingTaskId });
  },
  removingDraggingTaskId: () => {
    set({ draggingTaskId: undefined });
  },
  changeTaskStatus: (taskId: string, status: TaskStatus) => {
    const task = get().tasks[taskId];
    task.status = status;
    set((state) => ({
      tasks: {
        ...state.tasks,
        [taskId]: task,
      },
    }));
  },
  onTaskDrop: (status: TaskStatus) => {
    const draggingTaskId = get().draggingTaskId;
    if (draggingTaskId) {
      get().changeTaskStatus(draggingTaskId, status);
      get().removingDraggingTaskId();
    }
  },
});

export const useTaskStore = create<TaskState>()(devtools(storeAPI));
