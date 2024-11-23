import React from 'react';
import { Item } from '../types';
import { CheckCircle2 } from 'lucide-react';

interface ShoppingListProps {
  title: string;
  items: Item[];
  onToggleItem: (id: string) => void;
}

export default function ShoppingList({ title, items, onToggleItem }: ShoppingListProps) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">{title}</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {items.map(item => (
          <li 
            key={item.id}
            className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
              item.checked 
                ? 'bg-green-50 text-green-900'
                : 'hover:bg-gray-50'
            }`}
          >
            <button
              onClick={() => onToggleItem(item.id)}
              className="flex items-center gap-3 w-full"
            >
              <div className={`flex-shrink-0 w-5 h-5 rounded-full border-2 transition-colors duration-200 ${
                item.checked
                  ? 'border-green-500 bg-green-500'
                  : 'border-gray-300'
              }`}>
                {item.checked && (
                  <CheckCircle2 className="w-4 h-4 text-white" />
                )}
              </div>
              <span className={`flex-grow text-right ${
                item.checked ? 'line-through text-green-700' : 'text-gray-700'
              }`}>
                {item.name}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}