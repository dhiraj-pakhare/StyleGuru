import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

export default function AdminPanel({ open, setOpen }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!open) return;
    const fetchUsers = async () => {
      setLoading(true);
      const snap = await getDocs(collection(db, 'users'));
      setUsers(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    };
    fetchUsers();
  }, [open]);

  const toggleField = async (userId, field) => {
    const user = users.find(u => u.id === userId);
    await updateDoc(doc(db, 'users', userId), {
      [field]: !user[field],
    });
    setUsers(users.map(u => u.id === userId ? { ...u, [field]: !u[field] } : u));
  };

  return (
    open && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <span className="font-bold text-lg text-purple-500">Admin Panel</span>
            <button onClick={() => setOpen(false)} className="text-gray-400 text-2xl font-bold hover:text-pink-400">&times;</button>
          </div>
          {loading ? (
            <div className="text-center text-gray-400">Loading users...</div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="py-2">Name</th>
                  <th>Email</th>
                  <th>Admin</th>
                  <th>Banned</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id} className="border-t border-gray-200 dark:border-gray-700">
                    <td className="py-2 flex items-center gap-2">
                      {user.photoURL && <img src={user.photoURL} alt={user.displayName} className="w-8 h-8 rounded-full border-2 border-pink-400" />}
                      <span>{user.displayName || 'No Name'}</span>
                    </td>
                    <td>{user.email || user.id}</td>
                    <td>
                      <button onClick={() => toggleField(user.id, 'isAdmin')} className={`px-2 py-1 rounded ${user.isAdmin ? 'bg-purple-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white'}`}>{user.isAdmin ? 'Yes' : 'No'}</button>
                    </td>
                    <td>
                      <button onClick={() => toggleField(user.id, 'banned')} className={`px-2 py-1 rounded ${user.banned ? 'bg-pink-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white'}`}>{user.banned ? 'Yes' : 'No'}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    )
  );
} 