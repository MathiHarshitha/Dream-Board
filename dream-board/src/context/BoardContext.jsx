import { createContext, useState, useEffect } from "react";

export const BoardContext = createContext();

export const BoardProvider = ({ children }) => {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });

  // Save notes automatically
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = (text, category) => {
    const newNote = {
      id: Date.now(),
      text,
      category: category || "General",
      position: { x: 100, y: 100 },
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
  };

  return (
    <BoardContext.Provider
      value={{ notes, addNote, deleteNote, updateNotePosition }}
    >
      {children}
    </BoardContext.Provider>
  );
};
