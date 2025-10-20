import { useContext, useState } from 'react';
import { BoardContext } from '../context/BoardContext';
import Board from '../components/Board/Board';
import './Home.css';

const Home = () => {
  const { boards, addBoard } = useContext(BoardContext);
  const [boardTitle, setBoardTitle] = useState('');

  const handleAddBoard = () => {
    if (boardTitle.trim()) {
      addBoard(boardTitle);
      setBoardTitle('');
    }
  };

  return (
    <div className="home-container">
      <h1>Dream Board</h1>
      <div className="add-board">
        <input 
          type="text" 
          placeholder="New Board Title" 
          value={boardTitle}
          onChange={(e) => setBoardTitle(e.target.value)}
        />
        <button onClick={handleAddBoard}>Add Board</button>
      </div>
      <div className="boards-wrapper">
        {boards.map(board => (
          <Board key={board.id} board={board} />
        ))}
      </div>
    </div>
  );
};

export default Home;
