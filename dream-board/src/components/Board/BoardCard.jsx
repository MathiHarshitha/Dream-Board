import { useContext } from 'react';
import { BoardContext } from '../../context/BoardContext';

const BoardCard = ({ card, boardId }) => {
  const { deleteCard } = useContext(BoardContext);

  return (
    <div className="card">
      <p>{card.title}</p>
      <button onClick={() => deleteCard(boardId, card.id)}>Delete</button>
    </div>
  );
};

export default BoardCard;
