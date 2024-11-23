import React, { useState } from 'react';
import { Phone, Mail, Edit, Plus, MessageCircle, Check, X, Crown } from 'lucide-react';
import { Client, ClientCategory, ClientStatus } from '../types';
import ClientModal from './ClientModal';
import { useClients } from '../hooks/useClients';

export default function ClientList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const { clients, loading } = useClients();

  const handleWhatsApp = (phone: string) => {
    const formattedPhone = phone.replace(/\D/g, '');
    window.open(`https://wa.me/${formattedPhone}`, '_blank');
  };

  const handleEditClient = (client: Client) => {
    setSelectedClient(client);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 flex items-center justify-between border-b">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          <Plus className="h-4 w-4" />
          <span>לקוח חדש</span>
        </button>
        <h2 className="text-xl font-semibold text-gray-800">רשימת לקוחות</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-right">
          <thead className="bg-gray-50">
            <tr className="border-b">
              <th className="px-4 py-3 text-sm font-medium text-gray-500">#</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">איש מכירות</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">שם המתעניין</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">מקור הפניה</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">סטאטוס</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">טלפון</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">סלולרי</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">תאריך ליד</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">טופל</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">רלוונטי</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">פעולות</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client, index) => (
              <tr key={client.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 text-sm">{index + 1}</td>
                <td className="px-4 py-3 text-sm">מיכה לסרי</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Crown className="h-5 w-5 text-yellow-500" />
                    <span>{client.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm">{client.source || 'yad2'}</td>
                <td className="px-4 py-3 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    client.status === ClientStatus.ACTIVE 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {client.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">{client.phone}</td>
                <td className="px-4 py-3 text-sm">{client.mobile || '-'}</td>
                <td className="px-4 py-3 text-sm">
                  {new Date().toLocaleDateString('he-IL', {
                    hour: '2-digit',
                    minute: '2-digit',
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit'
                  })}
                </td>
                <td className="px-4 py-3">
                  {client.handled ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <X className="h-5 w-5 text-red-500" />
                  )}
                </td>
                <td className="px-4 py-3">
                  {client.relevant ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <X className="h-5 w-5 text-red-500" />
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleWhatsApp(client.phone)}
                      className="p-1 text-green-600 hover:bg-green-50 rounded"
                    >
                      <MessageCircle className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleEditClient(client)}
                      className="p-1 text-gray-600 hover:bg-gray-100 rounded"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ClientModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedClient(null);
        }}
        client={selectedClient}
      />
    </div>
  );
}