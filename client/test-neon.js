import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

async function testConnection() {
  try {
    // Test connection
    const time = await sql`SELECT CURRENT_TIMESTAMP`;
    console.log('✅ Database connected:', time[0]);

    // Test table exists
    const tables = await sql`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
    `;
    console.log('✅ Tables found:', tables);

    // Test creating a task
    const testTask = await sql`
      INSERT INTO tasks (title, description, status, priority)
      VALUES ('Test Task', 'This is a test', 'todo', 'high')
      RETURNING *
    `;
    console.log('✅ Test task created:', testTask[0]);

    // Get all tasks
    const allTasks = await sql`SELECT * FROM tasks`;
    console.log('✅ All tasks:', allTasks);

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

testConnection();
