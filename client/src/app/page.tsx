'use client';

import { useState } from 'react';
import { Task, TaskStatus, TaskPriority } from '@/types/task';

const STATUS_CONFIG = {
  todo: { label: "To Do", color: "bg-blue-600", bg: "bg-blue-50", border: "border-blue-300", text: "text-blue-700" },
  doing: { label: "In Progress", color: "bg-amber-600", bg: "bg-amber-50", border: "border-amber-300", text: "text-amber-700" },
  done: { label: "Completed", color: "bg-emerald-600", bg: "bg-emerald-50", border: "border-emerald-300", text: "text-emerald-700" },
} as const;

const PRIORITY_CONFIG = {
  high: { label: "High", color: "text-red-700", bg: "bg-red-100 border-red-300" },
  medium: { label: "Medium", color: "text-amber-700", bg: "bg-amber-100 border-amber-300" },
  low: { label: "Low", color: "text-green-700", bg: "bg-green-100 border-green-300" },
} as const;

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

const formatDueDate = (dateString: string | null) =>
  dateString ? new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : null;

const getDueDateConfig = (dateString: string | null) => {
  if (!dateString) return { text: 'No due date', color: 'text-gray-700', bg: 'bg-gray-50', border: 'border-gray-300' };

  const daysUntilDue = Math.ceil((new Date(dateString).getTime() - new Date().setHours(0, 0, 0, 0)) / (1000 * 60 * 60 * 24));

  if (daysUntilDue < 0) return { text: 'Overdue', color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-300' };
  if (daysUntilDue === 0) return { text: 'Due today', color: 'text-orange-700', bg: 'bg-orange-50', border: 'border-orange-300' };
  if (daysUntilDue <= 2) return { text: 'Due soon', color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-300' };
  return { text: 'On track', color: 'text-green-700', bg: 'bg-green-50', border: 'border-green-300' };
};

const sortTasks = (tasks: Task[], sortBy: 'created' | 'due' | 'priority') => {
  const priorityOrder = { high: 0, medium: 1, low: 2 };

  return [...tasks].sort((a, b) => {
    if (sortBy === 'created') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    if (sortBy === 'due') {
      if (!a.due_date) return 1;
      if (!b.due_date) return -1;
      return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
    }
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
};

const filterTasks = (tasks: Task[], query: string) => {
  if (!query) return tasks;
  const lowerQuery = query.toLowerCase();
  return tasks.filter(task =>
    task.title.toLowerCase().includes(lowerQuery) ||
    task.description.toLowerCase().includes(lowerQuery)
  );
};

const getTaskStats = (tasks: Task[]) => ({
  total: tasks.length,
  completed: tasks.filter(t => t.status === 'done').length,
  inProgress: tasks.filter(t => t.status === 'doing').length,
  todo: tasks.filter(t => t.status === 'todo').length,
});

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'created' | 'due' | 'priority'>('created');
  const [loading, setLoading] = useState(false);

  // Fetch tasks when page loads
  useState(() => {
    fetch('/api/test-db')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.tasks) {
          setTasks(data.tasks);
        }
      })
      .catch(err => console.error('Failed to load tasks:', err));
  });

  const filteredTasks = filterTasks(tasks, searchQuery);
  const sortedTasks = sortTasks(filteredTasks, sortBy);
  const taskStats = getTaskStats(tasks);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleDeleteTask = async (id: number) => {
    const formData = new FormData();
    formData.append('id', id.toString());

    try {
      const response = await fetch('/api/delete-task', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        setTasks(tasks.filter(t => t.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <nav className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-2 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
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
                onClick={openModal}
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

      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:8 py-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="relative flex-1 max-w-md w-full">
              <input
                type="text"
                placeholder="Search tasks..."
                className="w-full px-3 py-2 text-slate-700 pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm placeholder:text-slate-600"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg className="absolute left-3 top-2.5 w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-sm font-semibold text-slate-800">Sort by:</label>
              <select
                className="px-3 py-2 text-slate-700 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
              >
                <option value="created">Latest</option>
                <option value="due">Due Date</option>
                <option value="priority">Priority</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(['todo', 'doing', 'done'] as TaskStatus[]).map((status) => {
            const config = STATUS_CONFIG[status];
            const statusTasks = sortedTasks.filter(t => t.status === status);

            return (
              <div key={status} className="flex flex-col">
                <div className={`rounded-t-lg border-2 ${config.bg} ${config.border} px-4 py-3 flex items-center justify-between`}>
                  <div className="flex items-center space-x-2">
                    <span className={`w-2 h-2 rounded-full ${config.color}`}></span>
                    <h2 className={`font-semibold ${config.text}`}>{config.label}</h2>
                  </div>
                  <span className={`bg-white px-2 py-1 rounded-full text-sm font-medium ${config.text} border ${config.border}`}>
                    {statusTasks.length}
                  </span>
                </div>
                <div className={`flex-1 bg-white border-2 border-t-0 ${config.border} rounded-b-lg p-4 space-y-3 min-h-[500px]`}>
                  {statusTasks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center py-12">
                      <div className={`w-16 h-16 rounded-full ${config.bg} flex items-center justify-center mb-3`}>
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <p className="text-slate-700 text-sm font-medium">No tasks in this column</p>
                    </div>
                  ) : (
                    statusTasks.map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onDelete={handleDeleteTask}
                        formatDate={formatDate}
                        formatDueDate={formatDueDate}
                        getDueDateConfig={getDueDateConfig}
                        priorityConfig={PRIORITY_CONFIG}
                      />
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Task Creation Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-300">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">Create New Task</h2>
                  <p className="text-white text-sm mt-1 font-medium">
                    Fill in the details to create a new task
                  </p>
                </div>
                <button
                  onClick={closeModal}
                  className="text-white hover:text-gray-200 text-2xl leading-none"
                >
                  &times;
                </button>
              </div>
            </div>

            <form action="/api/create-task" method="POST" className="p-6 space-y-4">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-semibold text-slate-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  placeholder="Enter task title"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-slate-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  placeholder="Enter task description"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Status */}
                <div>
                  <label htmlFor="status" className="block text-sm font-semibold text-slate-700 mb-1">
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="todo">To Do</option>
                    <option value="doing">In Progress</option>
                    <option value="done">Completed</option>
                  </select>
                </div>

                {/* Priority */}
                <div>
                  <label htmlFor="priority" className="block text-sm font-semibold text-slate-700 mb-1">
                    Priority
                  </label>
                  <select
                    id="priority"
                    name="priority"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium" selected>Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              {/* Due Date */}
              <div>
                <label htmlFor="due_date" className="block text-sm font-semibold text-slate-700 mb-1">
                  Due Date
                </label>
                <input
                  type="date"
                  id="due_date"
                  name="due_date"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 shadow-sm hover:shadow-md transition-all"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function TaskCard({ task, onDelete, formatDate, formatDueDate, getDueDateConfig, priorityConfig }: {
  task: Task;
  onDelete: (id: number) => Promise<void>;
  formatDate: (dateString: string) => string;
  formatDueDate: (dateString: string | null) => string | null;
  getDueDateConfig: (dateString: string | null) => { text: string; color: string; bg: string; border: string };
  priorityConfig: { [key: string]: { label: string; color: string; bg: string; border: string } };
}) {
  const priorityInfo = priorityConfig[task.priority] || priorityConfig.medium;

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-slate-800">{task.title}</h3>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${priorityInfo.bg} ${priorityInfo.border} ${priorityInfo.color}`}>
          {priorityInfo.label}
        </span>
      </div>
      {task.description && (
        <p className="text-slate-600 text-sm mb-3">{task.description}</p>
      )}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>{formatDate(task.created_at)}</span>
        {formatDueDate(task.due_date) && (
          <span className={`px-2 py-1 rounded-full ${getDueDateConfig(task.due_date).bg} ${getDueDateConfig(task.due_date).border} ${getDueDateConfig(task.due_date).color}`}>
            {getDueDateConfig(task.due_date).text}
          </span>
        )}
      </div>
      <div className="flex justify-end mt-2 space-x-2">
        <button
          onClick={() => onDelete(Number(task.id))}
          className="text-red-600 hover:text-red-800 text-xs font-medium"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
