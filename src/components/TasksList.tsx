import React, { useState } from 'react';
import { CheckSquare, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { he } from 'date-fns/locale';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Task } from '../types';
import TaskModal from './TaskModal';

export default function TasksList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  const toggleTaskStatus = async (taskId: string, completed: boolean) => {
    try {
      await updateDoc(doc(db, 'tasks', taskId), { completed });
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          <Plus className="h-4 w-4" />
          <span>משימה חדשה</span>
        </button>
        <h2 className="text-xl font-semibold text-gray-800">משימות</h2>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleTaskStatus(task.id, !task.completed)}
                className="focus:outline-none"
              >
                <CheckSquare
                  className={`h-5 w-5 ${
                    task.completed ? 'text-green-500' : 'text-gray-400'
                  }`}
                />
              </button>
              <span className={task.completed ? 'line-through text-gray-500' : ''}>
                {task.title}
              </span>
            </div>
            <span className="text-sm text-gray-500 text-right">
              {format(task.dueDate, 'dd/MM/yyyy', { locale: he })}
            </span>
          </div>
        ))}
      </div>

      <TaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}