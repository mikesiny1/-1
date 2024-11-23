import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Category } from '../types';

interface AddItemFormProps {
  categories: Category[];
  onAddItem: (name: string, categoryId: string) => void;
}

export default function AddItemForm({ categories, onAddItem }: AddItemFormProps) {
  const [newItem, setNewItem] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItem.trim()) {
      onAddItem(newItem.trim(), selectedCategory);
      setNewItem('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">הוסף מוצר חדש</h2>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="הכנס שם מוצר"
          className="flex-grow p-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-shadow duration-200"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-shadow duration-200"
        >
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl shadow-md hover:from-green-600 hover:to-emerald-600 transition-all duration-300 whitespace-nowrap"
        >
          <Plus className="h-5 w-5" />
          הוסף
        </button>
      </div>
    </form>
  );
}