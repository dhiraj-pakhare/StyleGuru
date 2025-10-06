import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { db, auth, storage, getAIReply } from '../firebase';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, where, doc, setDoc, deleteDoc, getDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function ChatModal({ open, setOpen, roomId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [typingUsers, setTypingUsers] = useState([]);
  const messagesEndRef = useRef(null);
  const typingTimeout = useRef(null);
  const [editingId, setEditingId] = useState(null);
  const [editInput, setEditInput] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [search, setSearch] = useState('');

  // Listen for auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  // Listen for new messages in Firestore (filtered by roomId)
  useEffect(() => {
    if (!open || !roomId) return;
    const q = query(
      collection(db, 'messages'),
      where('roomId', '==', roomId),
      orderBy('createdAt')
    );
    const unsub = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
      if (msgs.length && msgs[msgs.length - 1].user === 'AI') setLoading(false);
    });
    return () => unsub();
  }, [open, roomId]);

  // Listen for typing users in this room
  useEffect(() => {
    if (!open || !roomId) return;
    const typingRef = collection(db, 'rooms', roomId, 'typing');
    const unsub = onSnapshot(typingRef, (snapshot) => {
      const typing = snapshot.docs
        .map(doc => doc.data())
        .filter(d => user && d.userId !== user.uid);
      setTypingUsers(typing);
    });
    return () => unsub();
  }, [open, roomId, user]);

  // Scroll to bottom on new message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Remove selected image
  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  // Send a new message (with roomId and optional image)
  const sendMessage = async (e) => {
    e.preventDefault();
    if ((!input.trim() && !imageFile) || !user) return;
    setLoading(true);
    let imageUrl = '';
    if (imageFile) {
      const imgRef = ref(storage, `chat_images/${roomId}/${user.uid}_${Date.now()}_${imageFile.name}`);
      await uploadBytes(imgRef, imageFile);
      imageUrl = await getDownloadURL(imgRef);
    }
    // Add user message
    await addDoc(collection(db, 'messages'), {
      text: input,
      imageUrl,
      createdAt: serverTimestamp(),
      user: user.displayName || user.email || 'User',
      userPhoto: user.photoURL || '',
      userId: user.uid,
      roomId,
    });
    setInput('');
    setImageFile(null);
    setImagePreview(null);
    // Remove typing flag
    await deleteDoc(doc(db, 'rooms', roomId, 'typing', user.uid));

    // If the message is text only, get AI reply
    if (input.trim()) {
      try {
        const aiReply = await getAIReply(input);
        await addDoc(collection(db, 'messages'), {
          text: aiReply,
          imageUrl: '',
          createdAt: serverTimestamp(),
          user: 'AI',
          userPhoto: '',
          userId: 'ai',
          roomId,
        });
      } catch (err) {
        await addDoc(collection(db, 'messages'), {
          text: "Sorry, I couldn't process your request.",
          imageUrl: '',
          createdAt: serverTimestamp(),
          user: 'AI',
          userPhoto: '',
          userId: 'ai',
          roomId,
        });
      }
    }
    setLoading(false);
  };

  // Handle typing indicator
  const handleInputChange = async (e) => {
    setInput(e.target.value);
    if (!user) return;
    // Set typing flag
    await setDoc(doc(db, 'rooms', roomId, 'typing', user.uid), {
      userId: user.uid,
      user: user.displayName || user.email || 'User',
      userPhoto: user.photoURL || '',
      lastTyped: Date.now(),
    });
    // Remove typing flag after 2.5s of inactivity
    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(async () => {
      await deleteDoc(doc(db, 'rooms', roomId, 'typing', user.uid));
    }, 2500);
  };

  // Remove typing flag on unmount or close
  useEffect(() => {
    return () => {
      if (user && roomId) {
        deleteDoc(doc(db, 'rooms', roomId, 'typing', user.uid));
      }
    };
  }, [user, roomId]);

  // Edit message
  const startEdit = (msg) => {
    setEditingId(msg.id);
    setEditInput(msg.text);
  };
  const cancelEdit = () => {
    setEditingId(null);
    setEditInput('');
  };
  const saveEdit = async (msg) => {
    if (!editInput.trim()) return;
    await updateDoc(doc(db, 'messages', msg.id), { text: editInput });
    setEditingId(null);
    setEditInput('');
  };
  // Delete message
  const handleDelete = async (msg) => {
    await deleteDoc(doc(db, 'messages', msg.id));
  };

  // Filter messages by search
  const filteredMessages = search.trim()
    ? messages.filter(m => m.text && m.text.toLowerCase().includes(search.toLowerCase()))
    : messages;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="w-full max-w-md bg-white dark:bg-gray-900 rounded-t-2xl md:rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-500 to-pink-500">
              <span className="font-bold text-white text-lg">StyleGuru Chat</span>
              <button onClick={() => setOpen(false)} className="text-white text-2xl font-bold hover:text-pink-200">&times;</button>
            </div>
            {/* Search Bar */}
            <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <input
                type="text"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-white"
                placeholder="Search messages..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2 bg-white dark:bg-gray-900" style={{ minHeight: 300 }}>
              {filteredMessages.length === 0 && (
                <div className="text-gray-400 text-center mt-8">No messages yet. Say hi!</div>
              )}
              {filteredMessages.map(msg => (
                msg.user === 'AI' ? (
                  <div key={msg.id} className="flex flex-col items-end">
                    <span className="text-xs text-pink-500 mb-1">AI</span>
                    <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-200 to-purple-200 text-gray-900 dark:from-pink-900 dark:to-purple-900 dark:text-white shadow self-end flex items-end">
                      {msg.text}
                      {msg.createdAt && msg.createdAt.toDate && (
                        <span className="text-xs text-gray-400 ml-2">{msg.createdAt.toDate().toLocaleTimeString()}</span>
                      )}
                    </div>
                  </div>
                ) : (
                  <div key={msg.id} className="flex flex-col items-start group relative">
                    <div className="flex items-center gap-2 mb-1">
                      {msg.userPhoto && <img src={msg.userPhoto} alt={msg.user} className="w-6 h-6 rounded-full border border-pink-400" />}
                      <span className="text-xs text-purple-500">{msg.user || 'User'}</span>
                    </div>
                    {editingId === msg.id ? (
                      <div className="flex items-center gap-2">
                        <input
                          className="px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-white"
                          value={editInput}
                          onChange={e => setEditInput(e.target.value)}
                          autoFocus
                        />
                        <button onClick={() => saveEdit(msg)} className="text-green-600 font-bold">Save</button>
                        <button onClick={cancelEdit} className="text-gray-400 font-bold">Cancel</button>
                      </div>
                    ) : (
                      <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-100 to-pink-100 text-gray-800 dark:from-purple-900 dark:to-pink-900 dark:text-white shadow flex items-end group-hover:bg-gray-100 dark:group-hover:bg-gray-800">
                        {msg.text}
                        {msg.createdAt && msg.createdAt.toDate && (
                          <span className="text-xs text-gray-400 ml-2">{msg.createdAt.toDate().toLocaleTimeString()}</span>
                        )}
                        {/* Edit/Delete buttons for own messages */}
                        {user && msg.userId === user.uid && (
                          <span className="ml-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => startEdit(msg)} className="text-blue-500 text-xs">Edit</button>
                            <button onClick={() => handleDelete(msg)} className="text-red-500 text-xs">Delete</button>
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                )
              ))}
              {loading && (
                <div className="flex justify-center my-2">
                  <motion.div
                    className="flex items-center gap-2"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: {},
                      visible: {
                        transition: { staggerChildren: 0.2, repeat: Infinity, repeatType: 'loop' }
                      }
                    }}
                  >
                    <motion.span
                      className="w-3 h-3 rounded-full bg-pink-400"
                      variants={{ visible: { y: [0, -8, 0] } }}
                      transition={{ duration: 0.8, repeat: Infinity, repeatType: 'loop' }}
                    />
                    <motion.span
                      className="w-3 h-3 rounded-full bg-purple-400"
                      variants={{ visible: { y: [0, -8, 0] } }}
                      transition={{ duration: 0.8, repeat: Infinity, repeatType: 'loop', delay: 0.2 }}
                    />
                    <motion.span
                      className="w-3 h-3 rounded-full bg-pink-400"
                      variants={{ visible: { y: [0, -8, 0] } }}
                      transition={{ duration: 0.8, repeat: Infinity, repeatType: 'loop', delay: 0.4 }}
                    />
                    <span className="ml-2 text-pink-400 font-medium">AI is thinking...</span>
                  </motion.div>
                </div>
              )}
              {typingUsers.length > 0 && (
                <div className="text-center text-purple-400 my-2 animate-pulse">
                  {typingUsers.map(u => u.user).join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            {/* Input */}
            <form onSubmit={sendMessage} className="flex items-center gap-2 px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <label className="cursor-pointer flex items-center">
                <svg className="w-6 h-6 text-purple-400 hover:text-pink-500 transition mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828L18 9.828M7 7h.01M7 7a5 5 0 017.071 0l6.586 6.586a2 2 0 01-2.828 2.828L7 7z" />
                </svg>
                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </label>
              {imagePreview && (
                <div className="relative mr-2">
                  <img src={imagePreview} alt="preview" className="w-12 h-12 object-cover rounded-lg border-2 border-pink-400" />
                  <button type="button" onClick={removeImage} className="absolute -top-2 -right-2 bg-white text-pink-500 rounded-full w-6 h-6 flex items-center justify-center shadow">&times;</button>
                </div>
              )}
              <input
                type="text"
                className="flex-1 rounded-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder={user ? "Type your message..." : "Login to chat"}
                value={input}
                onChange={handleInputChange}
                disabled={!user}
              />
              <button type="submit" disabled={!user || !input.trim()} className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow hover:from-pink-500 hover:to-purple-500 transition-all disabled:opacity-50">Send</button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 