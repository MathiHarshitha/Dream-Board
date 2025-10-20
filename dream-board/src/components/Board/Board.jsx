import { useState, useContext } from 'react';
import { BoardContext } from '../../context/BoardContext';
import Card from './BoardCard';

const Board = ({ board }) => {
  const { addCard, deleteBoard } = useContext(BoardContext);
  const [cardTitle, setCardTitle] = useState('');

  const handleAddCard = () => {
    if (cardTitle.trim()) {
      addCard(board.id, { title: cardTitle });
      setCardTitle('');
    }
  };

  return (
    <div className="board">
      <h2>{board.title}</h2>
      <button onClick={() => deleteBoard(board.id)}>Delete Board</button>
      <div className="cards">
        {board.cards.map(card => (
          <Card key={card.id} card={card} boardId={board.id} />
        ))}
      </div>
      <div className="add-card">
        <input 
          type="text" 
          placeholder="New Card" 
          value={cardTitle}
          onChange={(e) => setCardTitle(e.target.value)}
        />
        <button onClick={handleAddCard}>Add Card</button>
      </div>
    </div>
  );
};

export default Board;
