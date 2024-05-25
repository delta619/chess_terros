import React, { useState } from 'react';
import { isWhite, isBlack, getDirectionHash, isOpponent, isNotWhite, buzzCell } from './helper'

import './Board.css';
import { getIcon } from './iconSetup'
import { isValid, getAllValidMoves } from './constraints'
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

const Board = (props) => {



  const [board, setBoard] = useState(initialiseAllPieces());
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [turn, setTurn] = useState(true);
  const [check, setCheck] = useState("");

  function handleClick(r, c) {
    // only allow selection of white pieces if it is white's turn

    if (!selectedPiece && turn == 1 && isBlack(board[r][c]) || !selectedPiece && turn == 0 && isWhite(board[r][c]) || !selectedPiece && board[r][c] === '') {
      buzzCell(r, c);
      return
    }

    let fromCell = document.getElementsByClassName('cell')[r * 8 + c];
    if (selectedPiece === null) {
      setSelectedPiece({ r, c });
      fromCell.classList.add('cell_selected');
      let moves = getAllValidMoves(board[r][c], r, c, board, turn);
      // console.log("FINALLL", moves);

      for (let i = 0; i < moves.length; i++) {
        let [x, y] = moves[i]
        let cell = document.getElementsByClassName('cell')[x * 8 + y];
        cell.classList.add('cell_valid');
      }
    } else {
      // remove all cell_valid classes
      let validCells = document.getElementsByClassName('cell_valid');
      while (validCells.length > 0) {
        validCells[0].classList.remove('cell_valid');
      }

      movePiece(r, c);
    }
  }

  function movePiece(r, c) {

    const { "r": srx, "c": scx } = selectedPiece;

    if (r == srx && c == scx || !isValid({ srx, scx }, { r, c }, board, turn, (err) => {
      buzzCell(srx, scx);
      
    })) {
      let fromCell = document.getElementsByClassName('cell')[srx * 8 + scx];
      fromCell.classList.remove('cell_selected');
      setSelectedPiece(null);
      let validCells = document.getElementsByClassName('cell_valid');
      while (validCells.length > 0) {
        validCells[0].classList.remove('cell_valid');
      }

      return
    }

    let fromCell = document.getElementsByClassName('cell')[srx * 8 + scx];
    fromCell.classList.remove('cell_selected');
    const newBoard = board.map(row => [...row]);
    newBoard[r][c] = newBoard[srx][scx];
    newBoard[srx][scx] = '';
    setBoard(newBoard);
    setSelectedPiece(null);
    setTurn(!turn)
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
    <>
      {turn === true ? <h1>White's Turn</h1> : <h1>Black's Turn</h1> }
      <div className='grid'>
        {renderGrid()}
      </div>
    </>
  );
};

export default Board;
