'use server';

import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export async function testConnection() {
  try {
    // Test basic connection
    const result = await sql`SELECT CURRENT_TIMESTAMP`;
    return { success: true, timestamp: result[0] };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}
