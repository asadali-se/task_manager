import { Task, TaskFormData } from '@/types/task';

// API base URL - will be replaced with Railway URL once deployed
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://task-manager-api.up.railway.app/api';

export async function fetchTasks(): Promise<Task[]> {
    const response = await fetch(`${API_BASE}/tasks/`);
    if (!response.ok) throw new Error('Failed to fetch tasks');
    return response.json();
}

export async function createTask(data: TaskFormData): Promise<Task> {
    const response = await fetch(`${API_BASE}/tasks/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create task');
    return response.json();
}

export async function updateTask(id: number, data: TaskFormData): Promise<Task> {
    const response = await fetch(`${API_BASE}/tasks/${id}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update task');
    return response.json();
}

export async function deleteTask(id: number): Promise<void> {
    const response = await fetch(`${API_BASE}/tasks/${id}/`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete task');
}
