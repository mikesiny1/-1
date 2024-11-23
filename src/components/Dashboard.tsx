import React, { useState } from 'react';
import { 
  PieChart, 
  Home, 
  Users, 
  Calendar, 
  Mail,
  Phone,
  Send,
  FileText,
  X
} from 'lucide-react';
import MenuCard from './MenuCard';
import DistributionChart from './DistributionChart';
import ClientList from './ClientList';
import { Dialog } from '@headlessui/react';

export default function Dashboard() {
  const [showPropertyChart, setShowPropertyChart] = useState(false);
  const [showClientManagement, setShowClientManagement] = useState(false);

  const menuItems = [
    { title: 'דוחות', icon: PieChart, color: 'bg-brown-500', link: '/reports' },
    { 
      title: 'נכסים', 
      icon: Home, 
      color: 'bg-green-500', 
      onClick: () => setShowPropertyChart(true) 
    },
    { 
      title: 'מתעניינים', 
      icon: Users, 
      color: 'bg-green-600', 
      badge: '2', 
      onClick: () => setShowClientManagement(true)
    },
    { title: 'סדר יום', icon: Calendar, color: 'bg-blue-500', link: '/schedule' },
    { title: 'דיוור ישיר', icon: Send, color: 'bg-cyan-500', link: '/direct-mail' },
    { title: 'דואר', icon: Mail, color: 'bg-red-400', link: '/mail' },
    { title: 'יומן', icon: FileText, color: 'bg-yellow-400', link: '/calendar' },
    { title: 'טלפוניה', icon: Phone, color: 'bg-purple-400', link: '/phone' },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-right">לוח בקרה</h1>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-8">
        {menuItems.map((item) => (
          <MenuCard 
            key={item.title} 
            {...item} 
            onClick={item.onClick}
          />
        ))}
      </div>

      <Dialog 
        open={showPropertyChart} 
        onClose={() => setShowPropertyChart(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-lg w-full bg-white rounded-lg shadow-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setShowPropertyChart(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
              <Dialog.Title className="text-xl font-semibold">
                התפלגות נכסים
              </Dialog.Title>
            </div>
            <DistributionChart type="property" />
          </Dialog.Panel>
        </div>
      </Dialog>

      <Dialog 
        open={showClientManagement} 
        onClose={() => setShowClientManagement(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-4xl w-full bg-white rounded-lg shadow-xl">
            <div className="flex items-center justify-between p-6 border-b">
              <button
                onClick={() => setShowClientManagement(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
              <Dialog.Title className="text-xl font-semibold">
                ניהול מתעניינים
              </Dialog.Title>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">התפלגות לקוחות</h3>
                <DistributionChart type="client" />
              </div>
              <ClientList />
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}