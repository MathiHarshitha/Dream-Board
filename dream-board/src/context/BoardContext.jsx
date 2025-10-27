import { createContext, useState, useEffect } from "react";

export const BoardContext = createContext();

export const BoardProvider = ({ children }) => {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  // 🧠 Save notes automatically when they change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // ➕ Add new note
  const addNote = (text) => {
    const newNote = {
      id: Date.now(),
      text,
      position: { x: 100, y: 100 },
    };
    setNotes((prev) => [...prev, newNote]);
  };

  // ❌ Delete note
  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  // 🧩 Update note position when dragged
  const updateNotePosition = (id, x, y) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, position: { x, y } } : note
      )
    );
  };

  return (
    <BoardContext.Provider
      value={{ notes, addNote, deleteNote, updateNotePosition }}
    >
      {children}
    </BoardContext.Provider>
  );
};
