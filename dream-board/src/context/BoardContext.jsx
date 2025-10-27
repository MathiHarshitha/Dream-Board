import { createContext, useState, useEffect } from "react";

export const BoardContext = createContext();

export const BoardProvider = ({ children }) => {
  const [notes, setNotes] = useState(() => {
    // Load notes with positions from localStorage
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    // Save all notes with current positions whenever notes change
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = (text, category) => {
    if (!text) return;
    const newNote = {
      id: Date.now(),
      text,
      category: category || "General",
      position: { x: 50, y: 50 }, // initial position
    };
    setNotes((prev) => [...prev, newNote]);
  };

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const updateNotePosition = (id, x, y) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, position: { x, y } } : note
      )
    );
    // localStorage automatically updates because of useEffect
  };

  return (
    <BoardContext.Provider
      value={{ notes, addNote, deleteNote, updateNotePosition }}
    >
      {children}
    </BoardContext.Provider>
  );
};
