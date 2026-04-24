import { neon } from '@neondatabase/serverless';

export async function GET() {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const tasks = await sql`SELECT * FROM tasks ORDER BY created_at DESC LIMIT 10`;

    return Response.json({
      success: true,
      tasks: tasks,
      database: 'Connected to Neon'
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: String(error),
      database_url: process.env.DATABASE_URL ? 'set' : 'not set'
    });
  }
}
