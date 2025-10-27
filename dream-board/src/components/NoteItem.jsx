import React from "react";
import Draggable from "react-draggable";

const NoteItem = ({ note, onDelete }) => {
  return (
    <Draggable>
      <div
        className="bg-white rounded-lg shadow-md p-4 m-3 w-64 cursor-move"
        style={{
          position: "absolute",
        }}
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
    </Draggable>
  );
};

export default NoteItem;
