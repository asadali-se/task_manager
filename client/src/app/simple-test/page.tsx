import { CreateTaskForm } from '@/components/CreateTaskForm';

export default function SimpleTestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Simple Task Creation Test</h1>

        <div className="bg-white rounded-lg shadow p-8">
          <p className="text-center mb-6 text-slate-600">
            This page uses native HTML forms with Server Actions (following the Neon guide pattern).
          </p>

          <button
            onClick={() => {
              const modal = document.getElementById('task-form');
              modal?.classList.remove('hidden');
            }}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all"
          >
            Open Task Form
          </button>

          <div id="task-form" className="hidden mt-4">
            <CreateTaskForm onCancel={() => {
              const modal = document.getElementById('task-form');
              modal?.classList.add('hidden');
            }} />
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Instructions:</h2>
          <ol className="list-decimal list-inside space-y-2 text-slate-700">
            <li>Click "Open Task Form"</li>
            <li>Fill in the task details</li>
            <li>Click "Create Task"</li>
            <li>The page should refresh and you should be redirected to the main page</li>
            <li>Check your Neon database to verify the task was created</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
