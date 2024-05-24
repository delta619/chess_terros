import React, { useState } from 'react';
import './Board.css';
import { getIcon } from './iconSetup'
import { isValid } from './constraints'
function initialiseAllPieces() {
  return [
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    Array(8).fill(''),
    Array(8).fill(''),
    Array(8).fill(''),
    Array(8).fill(''),
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
  ];
}

const Board = () => {


  const [board, setBoard] = useState(initialiseAllPieces());
  const [selectedPiece, setSelectedPiece] = useState(null);

  function handleClick(r, c) {
    let fromCell = document.getElementsByClassName('cell')[r * 8 + c];
    if (selectedPiece === null) {
      setSelectedPiece({ r, c });
      fromCell.classList.add('cell_selected');




    } else {
      movePiece(r, c);

    }
  }

  function movePiece(r, c) {

    const { r: srx, c: scx } = selectedPiece;

    if (!isValid({ srx, scx }, { r, c }, board, (err)=>{alert(err)})) {
      let fromCell = document.getElementsByClassName('cell')[srx * 8 + scx];
      fromCell.classList.remove('cell_selected');
      setSelectedPiece(null);

      return
    }

    let fromCell = document.getElementsByClassName('cell')[srx * 8 + scx];
    fromCell.classList.remove('cell_selected');
    const newBoard = board.map(row => [...row]);
    newBoard[r][c] = newBoard[srx][scx];
    newBoard[srx][scx] = '';
    setBoard(newBoard);
    setSelectedPiece(null);
  }

  function renderCell(r, c) {
    return (
      <div key={`${r}-${c}`} className={"cell " + ((r + c) % 2 ? "white" : "grey")} onClick={() => handleClick(r, c)}>
        {getIcon(board[r][c])}
      </div>
    );
  }

  function renderRow(r) {
    const row = [];
    for (let i = 0; i < 8; i++) {
      row.push(renderCell(r, i));
    }
    return row;
  }

  function renderGrid() {
    const grid = [];
    for (let i = 0; i < 8; i++) {
      grid.push(<div key={i} className="row">{renderRow(i)}</div>);
    }
    return grid;
  }

  return (
    <div className='grid'>
      {renderGrid()}
    </div>
  );
};

export default Board;
