import React, { useContext, useState } from "react";
import { DndContext } from "@dnd-kit/core";
import NoteItem from "../components/NoteItem";
import { BoardContext } from "../context/BoardContext";

const Home = () => {
  const { notes, addNote, deleteNote, updateNotePosition } =
    useContext(BoardContext);

  const [noteText, setNoteText] = useState("");
  const [category, setCategory] = useState("General");
  const [search, setSearch] = useState("");

  const handleAddNote = () => {
    if (noteText.trim()) {
      addNote(noteText, category);
      setNoteText("");
    }
  };

  const handleDragEnd = (event) => {
    const { delta, active } = event;
    if (!delta) return;
    const id = parseInt(active.id);
    const note = notes.find((n) => n.id === id);
    if (note) {
      const newX = note.position.x + delta.x;
      const newY = note.position.y + delta.y;
      updateNotePosition(id, newX, newY);
    }
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.text.toLowerCase().includes(search.toLowerCase()) ||
      note.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 relative overflow-hidden">
        <div className="flex flex-col items-center py-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Dream Board</h1>
          <div className="flex gap-3 mb-4">
            <input
              type="text"
              placeholder="Add your dream..."
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              className="border rounded-lg px-4 py-2 w-72 shadow-sm"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border rounded-lg px-4 py-2"
            >
              <option>General</option>
              <option>Career</option>
              <option>Travel</option>
              <option>Health</option>
              <option>Personal</option>
            </select>
            <button
              onClick={handleAddNote}
              className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition"
            >
              Add
            </button>
          </div>

          <input
            type="text"
            placeholder="Search by text or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-4 py-2 w-96 mb-6 shadow-sm"
          />
        </div>

        {filteredNotes.map((note) => (
          <NoteItem key={note.id} note={note} onDelete={deleteNote} />
        ))}
      </div>
    </DndContext>
  );
};

export default Home;
