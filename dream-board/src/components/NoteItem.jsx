import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { motion } from "framer-motion";

const NoteItem = ({ note, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: note.id.toString(),
  });

  const style = {
    transform: transform
      ? `translate3d(${note.position.x + transform.x}px, ${note.position.y + transform.y}px, 0)`
      : `translate3d(${note.position.x}px, ${note.position.y}px, 0)`,
    position: "absolute",
    cursor: "move",
  };

  return (
    <motion.div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="bg-white rounded-lg shadow-md p-4 w-64"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      layout
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-800 whitespace-pre-wrap">{note.text}</p>
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
