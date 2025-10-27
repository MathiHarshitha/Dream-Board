import React, { useContext, useState } from "react";
import { BoardContext } from "../context/BoardContext";
import NoteItem from "../components/NoteItem";

const Home = () => {
  const { notes, addNote, deleteNote, updateNotePosition } =
    useContext(BoardContext);
  const [noteText, setNoteText] = useState("");
  const [category, setCategory] = useState("General");
  const [search, setSearch] = useState("");

  const handleAddNote = () => {
    if (!noteText.trim()) return;
    addNote(noteText, category);
    setNoteText("");
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.text.toLowerCase().includes(search.toLowerCase()) ||
      note.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 relative overflow-hidden p-6">
      <div className="flex flex-col items-center mb-6">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-6">
          Dream Board
        </h1>
        <div className="flex gap-3 mb-4">
          <input
            type="text"
            placeholder="Add your dream..."
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            className="border rounded-lg px-4 py-2 w-72 shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded-lg px-4 py-2 shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option>General</option>
            <option>Career</option>
            <option>Travel</option>
            <option>Health</option>
            <option>Personal</option>
          </select>
          <button
            onClick={handleAddNote}
            className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition shadow-md"
          >
            Add
          </button>
        </div>

        <input
          type="text"
          placeholder="Search by text or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-4 py-2 w-96 mb-6 shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      {filteredNotes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          onDelete={deleteNote}
          onDrag={updateNotePosition}
        />
      ))}
    </div>
  );
};

export default Home;
