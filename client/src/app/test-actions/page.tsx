'use client';

import { useState } from 'react';
import { createTask } from '@/lib/actions';

export default function TestActionsPage() {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testCreateTask = async () => {
    setLoading(true);
    setResult('');
    try {
      const task = await createTask({
        title: 'Test Task',
        description: 'This is a test task',
        status: 'todo',
        priority: 'high',
        due_date: null
      });
      setResult(`✅ Success! Created task: ${JSON.stringify(task)}`);
    } catch (error) {
      setResult(`❌ Error: ${String(error)}`);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Server Actions Test</h1>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <button
            onClick={testCreateTask}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Test Task'}
          </button>
        </div>

        {result && (
          <div className="bg-white rounded-lg shadow p-6">
            <pre className="whitespace-pre-wrap">{result}</pre>
          </div>
        )}

        <div className="mt-8 bg-gray-100 rounded-lg p-4">
          <h2 className="font-bold mb-2">Environment Check:</h2>
          <p><strong>DATABASE_URL:</strong> {process.env.DATABASE_URL ? '✅ Set' : '❌ Not set'}</p>
        </div>
      </div>
    </div>
  );
}
