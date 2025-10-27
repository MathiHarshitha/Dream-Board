import React from "react";
import { useDraggable } from "@dnd-kit/core";

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
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="bg-white rounded-lg shadow-md p-4 w-64"
    >
      <div className="flex justify-between items-start">
        <p className="text-gray-800 whitespace-pre-wrap">{note.text}</p>
        <button
          onClick={() => onDelete(note.id)}
          className="text-red-500 font-bold ml-2 hover:text-red-700"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default NoteItem;
