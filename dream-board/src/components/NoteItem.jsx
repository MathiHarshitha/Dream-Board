import React, { useState } from "react";
import { motion } from "framer-motion";

const NoteItem = ({ note, onDelete, onDragEnd }) => {
  const [position, setPosition] = useState(note.position);

  return (
    <motion.div
      drag
      dragMomentum={false}
      onDrag={(e, info) => {
        // Update local state while dragging (smooth follow)
        setPosition({
          x: note.position.x + info.delta.x,
          y: note.position.y + info.delta.y,
        });
      }}
      onDragEnd={() => {
        // Save the final position to context / localStorage
        onDragEnd(note.id, position.x, position.y);
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        zIndex: 10,
      }}
      className="bg-white rounded-xl shadow-lg p-4 w-64 border border-gray-200 cursor-grab"
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
