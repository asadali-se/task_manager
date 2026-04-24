'use server';

import { neon } from '@neondatabase/serverless';
import { Task, TaskFormData } from '@/types/task';

const sql = neon(process.env.DATABASE_URL!);

// Get all tasks
export async function getTasks(): Promise<Task[]> {
  try {
    const tasks = await sql`
      SELECT * FROM tasks
      ORDER BY created_at DESC
    `;
    return tasks as Task[];
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }
}

// Create a new task
export async function createTask(data: TaskFormData): Promise<Task> {
  try {
    const result = await sql`
      INSERT INTO tasks (title, description, status, priority, due_date)
      VALUES (${data.title}, ${data.description}, ${data.status}, ${data.priority}, ${data.due_date || null})
      RETURNING *
    `;
    return result[0] as Task;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
}

// Update a task
export async function updateTask(id: number, data: TaskFormData): Promise<Task> {
  try {
    const result = await sql`
      UPDATE tasks
      SET title = ${data.title},
          description = ${data.description},
          status = ${data.status},
          priority = ${data.priority},
          due_date = ${data.due_date || null},
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `;
    return result[0] as Task;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
}

// Delete a task
export async function deleteTask(id: number): Promise<void> {
  try {
    await sql`DELETE FROM tasks WHERE id = ${id}`;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
}
