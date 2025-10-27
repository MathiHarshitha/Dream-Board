import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { motion } from "framer-motion";

const NoteItem = ({ note, onDelete, onDragStop }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: note.id.toString(),
  });

  const style = {
    position: "absolute",
    transform: transform
      ? `translate3d(${note.position.x + transform.x}px, ${note.position.y + transform.y}px, 0)`
      : `translate3d(${note.position.x}px, ${note.position.y}px, 0)`,
    cursor: "grab",
  };

  return (
    <motion.div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="bg-white rounded-xl shadow-lg p-4 w-64 min-h-[80px] border border-gray-200"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      exit={{ opacity: 0, scale: 0 }}
      layout
      onMouseUp={(e) => {
        // Trigger drag stop
        if (transform) {
          onDragStop(note.id, note.position.x + transform.x, note.position.y + transform.y);
        }
      }}
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
