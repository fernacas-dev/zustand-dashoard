import { JiraTasks } from "../../components";
import { useTaskStore } from "../../stores";

export const JiraPage = () => {
  const pendingTasks = useTaskStore((state) => state.getTaskStatus("open"));
  const inProgressTasks = useTaskStore((state) =>
    state.getTaskStatus("in-progress")
  );
  const doneTasks = useTaskStore((state) => state.getTaskStatus("done"));

  return (
    <>
      <h1>Tareas</h1>
      <p>Manejo de estado con objectos de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <JiraTasks title="Pendientes" value="open" tasks={pendingTasks} />

        <JiraTasks
          title="Avanzando"
          value="in-progress"
          tasks={inProgressTasks}
        />

        <JiraTasks title="Terminadas" value="done" tasks={doneTasks} />
      </div>
    </>
  );
};
