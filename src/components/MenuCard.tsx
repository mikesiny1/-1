import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MenuCardProps {
  title: string;
  icon: LucideIcon;
  color: string;
  link?: string;
  badge?: string;
  onClick?: () => void;
}

export default function MenuCard({ title, icon: Icon, color, link, badge, onClick }: MenuCardProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <a 
      href={link || '#'}
      onClick={handleClick}
      className="block relative aspect-square rounded-2xl shadow-md transition-transform hover:scale-105 cursor-pointer"
    >
      <div className={`${color} w-full h-full rounded-2xl p-6 flex flex-col items-center justify-center`}>
        {badge && (
          <span className="absolute top-2 right-2 bg-white text-green-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
            {badge}
          </span>
        )}
        <Icon className="h-12 w-12 text-white mb-3" />
        <span className="text-white text-lg font-medium text-center">{title}</span>
      </div>
    </a>
  );
}