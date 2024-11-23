import React, { useState } from 'react';
import { Send } from 'lucide-react';
import ShoppingList from './components/ShoppingList';
import AddItemForm from './components/AddItemForm';
import { categories } from './data/categories';
import { Item } from './types';

export default function App() {
  const [items, setItems] = useState<Record<string, Item[]>>(
    Object.fromEntries(
      categories.map(category => [
        category.id,
        category.defaultItems.map(name => ({ 
          id: crypto.randomUUID(),
          name,
          checked: false 
        }))
      ])
    )
  );

  const handleAddItem = (name: string, categoryId: string) => {
    setItems(prev => ({
      ...prev,
      [categoryId]: [...prev[categoryId], { 
        id: crypto.randomUUID(), 
        name, 
        checked: false 
      }]
    }));
  };

  const handleToggleItem = (categoryId: string, itemId: string) => {
    setItems(prev => ({
      ...prev,
      [categoryId]: prev[categoryId].map(item =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      )
    }));
  };

  const handleShareWhatsApp = () => {
    const message = categories
      .map(category => {
        const checkedItems = items[category.id]
          .filter(item => item.checked)
          .map(item => item.name)
          .sort();
        
        return checkedItems.length > 0 
          ? `${category.name}:\n${checkedItems.join('\n')}`
          : '';
      })
      .filter(Boolean)
      .join('\n\n');

    window.open(
      `https://wa.me/?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600">
          רשימת קניות למשק בית
        </h1>

        <div className="bg-white rounded-2xl shadow-xl ring-1 ring-black/5 overflow-hidden">
          <div className="divide-y divide-gray-100">
            {categories.map(category => (
              <div key={category.id} className="p-6">
                <ShoppingList
                  title={category.name}
                  items={items[category.id]}
                  onToggleItem={(itemId) => handleToggleItem(category.id, itemId)}
                />
              </div>
            ))}
          </div>

          <div className="bg-gray-50 p-6 space-y-6">
            <AddItemForm categories={categories} onAddItem={handleAddItem} />

            <button
              onClick={handleShareWhatsApp}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-4 rounded-xl shadow-md hover:from-green-600 hover:to-emerald-600 transition-all duration-300 text-lg font-medium"
            >
              <Send className="h-5 w-5" />
              שלח בוואטסאפ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}