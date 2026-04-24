import { neon } from '@neondatabase/serverless';
import { redirect } from 'next/navigation';

export async function POST(request: Request) {
  const formData = await request.formData();

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const status = formData.get('status') as string;
  const priority = formData.get('priority') as string;
  const due_date = formData.get('due_date') as string;

  if (!title || title.trim() === '') {
    return Response.json({ error: 'Title is required' }, { status: 400 });
  }

  try {
    const sql = neon(process.env.DATABASE_URL!);
    await sql`
      INSERT INTO tasks (title, description, status, priority, due_date)
      VALUES (${title.trim()}, ${description || ''}, ${status}, ${priority}, ${due_date || null})
    `;
    redirect('/');
  } catch (error) {
    console.error('Error creating task:', error);
    return Response.json({ error: 'Failed to create task' }, { status: 500 });
  }
}
