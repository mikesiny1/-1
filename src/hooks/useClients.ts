import { useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, updateDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Client } from '../types';

export function useClients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'clients'), orderBy('lastContact', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const clientsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        lastContact: doc.data().lastContact?.toDate() || new Date()
      })) as Client[];
      setClients(clientsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addClient = async (client: Omit<Client, 'id'>) => {
    try {
      const docRef = await addDoc(collection(db, 'clients'), {
        ...client,
        lastContact: new Date(),
        createdAt: new Date()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding client:', error);
      throw error;
    }
  };

  const updateClient = async (id: string, data: Partial<Client>) => {
    try {
      await updateDoc(doc(db, 'clients', id), {
        ...data,
        lastContact: new Date()
      });
    } catch (error) {
      console.error('Error updating client:', error);
      throw error;
    }
  };

  return { clients, loading, addClient, updateClient };
}