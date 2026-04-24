'use server';

import { neon } from '@neondatabase/serverless';
import { redirect } from 'next/navigation';

// Server Action for creating tasks
export async function createTask(formData: FormData) {
  'use server';

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const status = formData.get('status') as string;
  const priority = formData.get('priority') as string;
  const due_date = formData.get('due_date') as string;

  if (!title || title.trim() === '') {
    throw new Error('Title is required');
  }

  // Lazy load the database connection
  const sql = neon(process.env.DATABASE_URL!);

  await sql`
    INSERT INTO tasks (title, description, status, priority, due_date)
    VALUES (${title.trim()}, ${description || ''}, ${status}, ${priority}, ${due_date || null})
  `;

  redirect('/');
}

// Server Action for updating tasks
export async function updateTask(formData: FormData) {
  'use server';

  const id = formData.get('id') as string;
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const status = formData.get('status') as string;
  const priority = formData.get('priority') as string;
  const due_date = formData.get('due_date') as string;

  if (!id || !title || title.trim() === '') {
    throw new Error('Invalid data');
  }

  // Lazy load the database connection
  const sql = neon(process.env.DATABASE_URL!);

  await sql`
    UPDATE tasks
    SET title = ${title.trim()},
        description = ${description || ''},
        status = ${status},
        priority = ${priority},
        due_date = ${due_date || null},
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
  `;

  redirect('/');
}

// Server Action for deleting tasks
export async function deleteTask(formData: FormData) {
  'use server';

  const id = formData.get('id') as string;

  if (!id) {
    throw new Error('Invalid task ID');
  }

  // Lazy load the database connection
  const sql = neon(process.env.DATABASE_URL!);

  await sql`DELETE FROM tasks WHERE id = ${id}`;

  redirect('/');
}
