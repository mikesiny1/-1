import React, { useState } from 'react';
import { Calendar, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { he } from 'date-fns/locale';
import MeetingModal from './MeetingModal';

export default function MeetingsList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [meetings, setMeetings] = useState([
    { id: '1', title: 'פגישת התייעצות', client: 'משפחת לוי', date: new Date() },
    { id: '2', title: 'חתימת חוזה', client: 'דוד כהן', date: new Date() },
    { id: '3', title: 'הצגת דירה', client: 'רונית שמעוני', date: new Date() },
  ]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600"
        >
          <Plus className="h-4 w-4" />
          <span>פגישה חדשה</span>
        </button>
        <h2 className="text-xl font-semibold text-gray-800">פגישות קרובות</h2>
      </div>

      <div className="space-y-4">
        {meetings.map((meeting) => (
          <div
            key={meeting.id}
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-purple-500" />
              <div>
                <p className="font-medium">{meeting.title}</p>
                <p className="text-sm text-gray-500">{meeting.client}</p>
              </div>
            </div>
            <span className="text-sm text-gray-500 text-right">
              {format(meeting.date, 'HH:mm - dd/MM/yyyy', { locale: he })}
            </span>
          </div>
        ))}
      </div>

      <MeetingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}