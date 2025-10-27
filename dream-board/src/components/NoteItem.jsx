import React from "react";
import { motion } from "framer-motion";

const NoteItem = ({ note, onDelete, onDrag }) => {
  const handleDrag = (e) => {
    const rect = e.target.getBoundingClientRect();
    onDrag(note.id, rect.x, rect.y);
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      onDragEnd={handleDrag}
      style={{
        position: "absolute",
        left: note.position.x,
        top: note.position.y,
        zIndex: 10,
      }}
      className="bg-white rounded-xl shadow-lg p-4 w-64 border border-gray-200 cursor-grab"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-800 font-medium">{note.text}</p>
          <p className="text-sm text-gray-400 mt-1">{note.category}</p>
        </div>
        <button
          onClick={() => onDelete(note.id)}
          className="text-red-500 font-bold ml-2 hover:text-red-700"
        >
          ✕
        </button>
      </div>
    </motion.div>
  );
};

export default NoteItem;
