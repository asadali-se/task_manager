"use client";

import { useState, useEffect } from "react";
import { Task, TaskStatus, TaskFormData } from "@/types/task";
import { fetchTasks, createTask, updateTask, deleteTask } from "@/lib/api";
import TaskFormModal from "@/components/TaskFormModel";

const STATUS_CONFIG: Record<TaskStatus, { label: string; color: string; bg: string }> = {
  todo: { label: "To Do", color: "bg-blue-500", bg: "bg-blue-50 border-blue-200" },
  doing: {label: "Doing", color: "bg-yellow-500", bg: "bg-yellow-50 border-yellow-200" },
  done: { label: "Done", color: "bg-green-500", bg: "bg-green-50 border-green-200" },
};

const PRIORITY_COLORS: Record<string, string> = {
  high: "text-red-600",
  medium: "text-yellow-600",
  low: "text-green-600",
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    fetchTasks().then(setTasks);
  }, []);

  const handleSubmit = async (data: TaskFormData) => {
    if (editingTask) {
      const updated = await updateTask(Number(editingTask.id), data);
      setTasks(tasks.map((t) => (t.id === updated.id ? updated : t)));
    } else {
      const created = await createTask(data);
      setTasks([...tasks, created]);
    }
    setEditingTask(null);
  };

  const handleDelete = async (id: string) => {
    await deleteTask(Number(id));
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Task Manager</h1>
          <button
            onClick={() => { setEditingTask(null); setModalOpen(true) }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            + New Task
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(["todo", "doing", "done"] as TaskStatus[]).map((status) => {
            const config = STATUS_CONFIG[status];
            const columnTasks = tasks.filter((t) => t.status === status);

            return (
              <div key={status} className={`rounded-xl border-2 p-4 ${config.bg}`}>
                <div className="flex items-center gap-2 mb-4">
                  <span className={`w-3 h-3 rounded-full ${config.color}`} />
                  <h2 className="font-semibold text-gray-700">{config.label}</h2>
                  <span className="bg-white text-gray-500 text-lg px-2 rounded-full">
                    {columnTasks.length}
                  </span>
                </div>

                {columnTasks.length === 0 ? (
                  <p className="text-gray-400 text-sm text-center py-8">No tasks yet</p>
                ) : (
                  <div className="space-y-3">
                    {columnTasks.map((task) => (
                      <div
                        key={task.id}
                        className="bg-white rounded-lg p-4 shadow-sm border hover:shadow-md transition-shadow"
                      >
                        <h3 className="font-medium text-gray-800 break-words">{task.title}</h3>
                        {task.description && (
                          <p className="text-gray-500 text-sm mt-1 break-words">{task.description}</p>
                        )}
                        <div className="flex justify-between items-center mt-3">
                          <span className={`text-xs font-semibold uppercase ${PRIORITY_COLORS[task.priority]}`}>
                            {task.priority}
                          </span>
                          <div className="flex gap-1">
                            <button
                              onClick={() => { setEditingTask(task); setModalOpen(true) }}
                              className="text-gray-400 hover:text-blue-500 text-sm"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(task.id)}
                              className="text-gray-400 hover:text-red-500 text-sm"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <TaskFormModal
        key={editingTask?.id ?? "new"}
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditingTask(null) }}
        onSubmit={handleSubmit}
        task={editingTask}
      />
    </div>
  );
}
