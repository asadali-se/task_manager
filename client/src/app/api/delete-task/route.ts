import { neon } from '@neondatabase/serverless';
import { redirect } from 'next/navigation';

export async function POST(request: Request) {
  const formData = await request.formData();
  const id = formData.get('id') as string;

  if (!id) {
    return Response.json({ error: 'Invalid task ID' }, { status: 400 });
  }

  try {
    const sql = neon(process.env.DATABASE_URL!);
    await sql`DELETE FROM tasks WHERE id = ${id}`;
    redirect('/');
  } catch (error) {
    console.error('Error deleting task:', error);
    return Response.json({ error: 'Failed to delete task' }, { status: 500 });
  }
}
