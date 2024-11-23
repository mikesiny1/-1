import React from 'react';
import { db, auth } from '../lib/firebase';

interface FirebaseContextType {
  db: typeof db;
  auth: typeof auth;
}

export const FirebaseContext = React.createContext<FirebaseContextType | null>(null);

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  return (
    <FirebaseContext.Provider value={{ db, auth }}>
      {children}
    </FirebaseContext.Provider>
  );
}