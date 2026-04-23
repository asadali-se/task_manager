"use client";

import { useState, useEffect } from "react";
import { Task, TaskStatus, TaskFormData } from "@/types/task";
import { fetchTasks, createTask, updateTask, deleteTask } from "@/lib/api";
import TaskFormModal from "@/components/TaskFormModel";

const STATUS_CONFIG: Record<TaskStatus, { label: string; color: string; bg: string; border: string; text: string }> = {
  todo: { label: "To Do", color: "bg-blue-600", bg: "bg-blue-50", border: "border-blue-300", text: "text-blue-700" },
  doing: { label: "In Progress", color: "bg-amber-600", bg: "bg-amber-50", border: "border-amber-300", text: "text-amber-700" },
  done: { label: "Completed", color: "bg-emerald-600", bg: "bg-emerald-50", border: "border-emerald-300", text: "text-emerald-700" },
};

const PRIORITY_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  high: { label: "High", color: "text-red-700", bg: "bg-red-100 border-red-300" },
  medium: { label: "Medium", color: "text-amber-700", bg: "bg-amber-100 border-amber-300" },
  low: { label: "Low", color: "text-green-700", bg: "bg-green-100 border-green-300" },
};

const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const formatDueDate = (dateString: string | null) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const getDueDateConfig = (dateString: string | null) => {
  if (!dateString) return { text: 'No due date', color: 'text-gray-700', bg: 'bg-gray-50', border: 'border-gray-300' };
  const dueDate = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const daysUntilDue = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  if (daysUntilDue < 0) return { text: 'Overdue', color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-300' };
  if (daysUntilDue === 0) return { text: 'Due today', color: 'text-orange-700', bg: 'bg-orange-50', border: 'border-orange-300' };
  if (daysUntilDue <= 2) return { text: 'Due soon', color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-300' };
  return { text: 'On track', color: 'text-green-700', bg: 'bg-green-50', border: 'border-green-300' };
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'created' | 'due' | 'priority'>('created');

  useEffect(() => {
    fetchTasks().then(setTasks);
  }, []);

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'created') {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    } else if (sortBy === 'due') {
      if (!a.due_date) return 1;
      if (!b.due_date) return -1;
      return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
    } else {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
  });

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

  const taskStats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'done').length,
    inProgress: tasks.filter(t => t.status === 'doing').length,
    todo: tasks.filter(t => t.status === 'todo').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Professional Header */}
      <nav className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-2 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">Professional Task Manager</h1>
                <p className="text-xs text-slate-600 font-medium">Organize. Track. Succeed.</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-6 text-sm">
                <div className="text-center">
                  <div className="font-bold text-slate-800">{taskStats.total}</div>
                  <div className="text-slate-700 font-medium">Total</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-amber-600">{taskStats.inProgress}</div>
                  <div className="text-slate-700 font-medium">Active</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-emerald-600">{taskStats.completed}</div>
                  <div className="text-slate-700 font-medium">Done</div>
                </div>
              </div>

              <button
                onClick={() => { setEditingTask(null); setModalOpen(true) }}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm hover:shadow-md font-medium text-sm flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4v16m8-8H4" />
                </svg>
                <span>New Task</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Search and Filter Bar */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="relative flex-1 max-w-md w-full">
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-slate-700 pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm placeholder:text-slate-600"
              />
              <svg className="absolute left-3 top-2.5 w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <div className="flex items-center space-x-2">
              <label className="text-sm font-semibold text-slate-800">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'created' | 'due' | 'priority')}
                className="px-3 text-slate-700 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
              >
                <option  className= "text-slate-700" value="created">Latest</option>
                <option value="due" className="text-slate-700">Due Date</option>
                <option value="priority" className="text-slate-700">Priority</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Task Board */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(["todo", "doing", "done"] as TaskStatus[]).map((status) => {
            const config = STATUS_CONFIG[status];
            const columnTasks = sortedTasks.filter((t) => t.status === status);

            return (
              <div key={status} className="flex flex-col">
                {/* Column Header */}
                <div className={`rounded-t-lg border-2 ${config.bg} ${config.border} px-4 py-3 flex items-center justify-between`}>
                  <div className="flex items-center space-x-2">
                    <span className={`w-2 h-2 rounded-full ${config.color}`} />
                    <h2 className={`font-semibold ${config.text}`}>{config.label}</h2>
                  </div>
                  <span className={`bg-white px-2 py-1 rounded-full text-sm font-medium ${config.text} border ${config.border}`}>
                    {columnTasks.length}
                  </span>
                </div>

                {/* Task Cards */}
                <div className={`flex-1 bg-white border-2 border-t-0 ${config.border} rounded-b-lg p-4 space-y-3 min-h-[500px]`}>
                  {columnTasks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center py-12">
                      <div className={`w-16 h-16 rounded-full ${config.bg} flex items-center justify-center mb-3`}>
                        <svg className={`w-8 h-8 ${config.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <p className="text-slate-700 text-sm font-medium">No tasks in this column</p>
                    </div>
                  ) : (
                    columnTasks.map((task) => {
                      const priorityConfig = PRIORITY_CONFIG[task.priority];
                      const dueDateConfig = getDueDateConfig(task.due_date);

                      return (
                        <div
                          key={task.id}
                          className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200 hover:border-blue-300 group"
                        >
                          {/* Task Header */}
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-slate-800 break-words flex-1 pr-2">{task.title}</h3>
                            <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => { setEditingTask(task); setModalOpen(true) }}
                                className="text-slate-600 hover:text-blue-600 p-1 rounded hover:bg-blue-50 transition-colors"
                                title="Edit task"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                              <button
                                onClick={() => handleDelete(task.id)}
                                className="text-slate-600 hover:text-red-600 p-1 rounded hover:bg-red-50 transition-colors"
                                title="Delete task"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </div>

                          {/* Description */}
                          {task.description && (
                            <p className="text-slate-700 text-sm mt-2 mb-3 break-words line-clamp-2">{task.description}</p>
                          )}

                          {/* Badges */}
                          <div className="flex flex-wrap gap-2 mb-3">
                            <span className={`px-2 py-1 rounded text-xs font-medium border ${priorityConfig.bg} ${priorityConfig.color}`}>
                              {priorityConfig.label} Priority
                            </span>
                            {task.due_date && (
                              <span className={`px-2 py-1 rounded text-xs font-medium border ${dueDateConfig.bg} ${dueDateConfig.color} ${dueDateConfig.border}`}>
                                {dueDateConfig.text}
                              </span>
                            )}
                          </div>

                          {/* Footer with dates */}
                          <div className="pt-3 border-t border-slate-200">
                            <div className="text-xs text-slate-700 space-y-1">
                              <div className="flex items-center space-x-2">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span>Due: {task.due_date ? formatDueDate(task.due_date) : 'Not set'}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Updated: {formatDate(task.updated_at)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
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
