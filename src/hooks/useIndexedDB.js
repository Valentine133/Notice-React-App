import { openDB } from 'idb';

export const useIndexedDB = () => {
  const dbName = 'notes-db';
  const dbVersion = 1;
  const storeName = 'notes-store';
  const keyPath = 'id';

  const openDBPromise = openDB(dbName, dbVersion, {
    upgrade(db) {
      db.createObjectStore(storeName, { keyPath });
    },
  });

  const getAllNotes = async () => {
    const db = await openDBPromise;
    const tx = db.transaction(storeName, 'readonly');
    const store = tx.objectStore(storeName);
    const notes = await store.getAll();
    return notes;
  };

  const addNote = async (note) => {
    const db = await openDBPromise;
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    await store.add(note);
    await tx.complete;
  };

  const updateNote = async (note) => {
    const db = await openDBPromise;
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    await store.put(note);
    await tx.complete;
  };

  const deleteNote = async (note) => {
    const db = await openDBPromise;
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    await store.delete(note.id);
    await tx.complete;
  };

  const searchNotes = async (searchTerm) => {
    const db = await openDBPromise;
    const tx = db.transaction(storeName, 'readonly');
    const store = tx.objectStore(storeName);
    const notes = await store.getAll();
    return notes.filter((note) =>
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return {
    getAllNotes,
    addNote,
    updateNote,
    deleteNote,
    searchNotes,
  };
};
