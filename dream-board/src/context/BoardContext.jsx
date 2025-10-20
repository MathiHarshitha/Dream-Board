import { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const BoardContext = createContext();

export const BoardProvider = ({ children }) => {
  const [boards, setBoards] = useState(() => {
    const saved = localStorage.getItem('dreamBoards');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('dreamBoards', JSON.stringify(boards));
  }, [boards]);

  const addBoard = (title) => {
    setBoards([...boards, { id: uuidv4(), title, cards: [] }]);
  };

  const deleteBoard = (boardId) => {
    setBoards(boards.filter(board => board.id !== boardId));
  };

  const addCard = (boardId, card) => {
    setBoards(
      boards.map(board =>
        board.id === boardId
          ? { ...board, cards: [...board.cards, { id: uuidv4(), ...card }] }
          : board
      )
    );
  };

  const deleteCard = (boardId, cardId) => {
    setBoards(
      boards.map(board =>
        board.id === boardId
          ? { ...board, cards: board.cards.filter(card => card.id !== cardId) }
          : board
      )
    );
  };

  return (
    <BoardContext.Provider value={{ boards, addBoard, deleteBoard, addCard, deleteCard }}>
      {children}
    </BoardContext.Provider>
  );
};
