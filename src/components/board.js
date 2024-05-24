import React from 'react';
import './Board.css';

function putPiece(from , to){
  // from -> 2-4
  // to -> 4-4
  
  

}

function initialiseAllPieces(){

}

const Board = () => {

  function renderCell(r, c) {
    console.log(r, c);
    return (
      <div key={`${r}-${c}`} className={"cell " + ((r + c) % 2 ? "white" : "grey")}></div>
    );
  }

  function renderRow(r) {
    let row = [];
    for (let i = 0; i < 8; i++) {
      row.push(renderCell(r, i));
    }
    return row;
  }

  function renderGrid() {
    let grid = [];
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
