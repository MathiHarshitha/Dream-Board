import React from "react";
import { motion } from "framer-motion";

const NoteItem = ({ note, onDelete, onDragEnd }) => {
  return (
    <motion.div
      drag
      dragMomentum={false}
      onDragEnd={(event, info) => {
        // final position = original position + drag offset
        onDragEnd(note.id, note.position.x + info.point.x, note.position.y + info.point.y);
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      style={{
        position: "absolute",
        left: note.position.x,
        top: note.position.y,
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
