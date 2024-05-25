import { isWhite, isBlack, getDirectionHash, isOpponent } from './helper'
/*
Returns true if the move is possible, false otherwise
*/

var valid_moves = {
    'p': [[1, 0], [2, 0]],
    'P': [[-1, 0], [-2, 0]],
    'r': [[1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8],  // all horizontal
    [-1, 0], [-2, 0], [-3, 0], [-4, 0], [-5, 0], [-6, 0], [-7, 0], [-8, 0], [0, -1], [0, -2], [0, -3], [0, -4], [0, -5], [0, -6], [0, -7], [0, -8]], // all vertical
    'R': [[1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8],  // all horizontal
    [-1, 0], [-2, 0], [-3, 0], [-4, 0], [-5, 0], [-6, 0], [-7, 0], [-8, 0], [0, -1], [0, -2], [0, -3], [0, -4], [0, -5], [0, -6], [0, -7], [0, -8]], // all vertical
    'n': [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [1, -2], [-1, 2], [-1, -2]],
    'N': [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [1, -2], [-1, 2], [-1, -2]],
    'b': [[1, 1], [1, -1], [-1, 1], [-1, -1], [2, 2], [2, -2], [-2, 2], [-2, -2], [3, 3], [3, -3], [-3, 3], [-3, -3], [4, 4], [4, -4], [-4, 4], [-4, -4], [5, 5], [5, -5], [-5, 5], [-5, -5], [6, 6], [6, -6], [-6, 6], [-6, -6], [7, 7], [7, -7], [-7, 7], [-7, -7], [8, 8], [8, -8], [-8, 8], [-8, -8]],
    'B': [[1, 1], [1, -1], [-1, 1], [-1, -1], [2, 2], [2, -2], [-2, 2], [-2, -2], [3, 3], [3, -3], [-3, 3], [-3, -3], [4, 4], [4, -4], [-4, 4], [-4, -4], [5, 5], [5, -5], [-5, 5], [-5, -5], [6, 6], [6, -6], [-6, 6], [-6, -6], [7, 7], [7, -7], [-7, 7], [-7, -7], [8, 8], [8, -8], [-8, 8], [-8, -8]],
    'q': [[1, 1], [1, -1], [-1, 1], [-1, -1], [2, 2], [2, -2], [-2, 2], [-2, -2], [3, 3], [3, -3], [-3, 3], [-3, -3], [4, 4], [4, -4], [-4, 4], [-4, -4], [5, 5], [5, -5], [-5, 5], [-5, -5], [6, 6], [6, -6], [-6, 6], [-6, -6], [7, 7], [7, -7], [-7, 7], [-7, -7], [8, 8], [8, -8], [-8, 8], [-8, -8], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8], [-1, 0], [-2, 0], [-3, 0], [-4, 0], [-5, 0], [-6, 0], [-7, 0], [-8, 0], [0, -1], [0, -2], [0, -3], [0, -4], [0, -5], [0, -6], [0, -7], [0, -8]],
    'Q': [[1, 1], [1, -1], [-1, 1], [-1, -1], [2, 2], [2, -2], [-2, 2], [-2, -2], [3, 3], [3, -3], [-3, 3], [-3, -3], [4, 4], [4, -4], [-4, 4], [-4, -4], [5, 5], [5, -5], [-5, 5], [-5, -5], [6, 6], [6, -6], [-6, 6], [-6, -6], [7, 7], [7, -7], [-7, 7], [-7, -7], [8, 8], [8, -8], [-8, 8], [-8, -8], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8], [-1, 0], [-2, 0], [-3, 0], [-4, 0], [-5, 0], [-6, 0], [-7, 0], [-8, 0], [0, -1], [0, -2], [0, -3], [0, -4], [0, -5], [0, -6], [0, -7], [0, -8]],
    'k': [[1, 1], [1, -1], [-1, 1], [-1, -1], [1, 0], [-1, 0], [0, 1], [0, -1]],
    'K': [[1, 1], [1, -1], [-1, 1], [-1, -1], [1, 0], [-1, 0], [0, 1], [0, -1]],
    '': []
}


function isValidStep(from_piece, to_x, to_y, dest_x, dest_y, board, dir_hash, turn) {
    if (['n', 'N'].includes(from_piece)) {
        return true;
    }

    let x_diff = dest_x - to_x;
    let y_diff = dest_y - to_y;

    let dirx = x_diff === 0 ? 0 : (x_diff > 0 ? 1 : -1);
    let diry = y_diff === 0 ? 0 : (y_diff > 0 ? 1 : -1);

    while (to_x !== dest_x || to_y !== dest_y) {
        to_x += dirx;
        to_y += diry;
        if (board[to_x][to_y] !== '') {
            if (turn === true && isWhite(board[to_x][to_y]) || turn === false && isBlack(board[to_x][to_y]) || from_piece == 'p' && isOpponent(board[to_x][to_y], turn) || from_piece == 'P' && isOpponent(board[to_x][to_y], turn)) {
                // If it step is a same team piece, then mark blocking or IF for a pawn the step is an opponent, then block it because it can't attack straight, only diagonals
                // mark blocking
                dir_hash[dirx + ":" + diry] = 0;
                return false
            }
            if (dir_hash[dirx + ":" + diry] === 1) {
                // this is to show only closest opponent attack piece in green box as valid move
                dir_hash[dirx + ":" + diry] = 0;
                return true
            }


            return false;
        }

    }

    return true;
}

export function getAllValidMoves(from_piece, x, y, board, turn) {

    let moves = []
    for (let i = 0; i < valid_moves[from_piece].length; i++) {
        moves.push([x + valid_moves[from_piece][i][0], y + valid_moves[from_piece][i][1]]) // check each step from valid moves paths
    }
    // filter out of bounds moves
    moves = moves.filter(subArray => subArray[0] >= 0 && subArray[0] <= 7 && subArray[1] >= 0 && subArray[1] <= 7)

    // if (isWhite(from_piece)) { // spare its own teammates for whites
    //     moves = moves.filter(subArray => board[subArray[0]][subArray[1]] == '' || !isWhite(board[subArray[0]][subArray[1]]))
    // }
    if (!isWhite(from_piece)) { // spare its own teammates hor blacks
        moves = moves.filter(subArray => board[subArray[0]][subArray[1]] == '' || isWhite(board[subArray[0]][subArray[1]]))
    }

    // filter out moves which have pieces in the way
    let dir_hash = getDirectionHash()
    moves = moves.filter(move => isValidStep(from_piece, x, y, move[0], move[1], board, dir_hash, turn));

    // add the moves for pawn attacks
    if (from_piece === 'P' && x != 0 && y > 0 && isBlack(board[x - 1][y - 1])) {
        moves.push([x - 1, y - 1]);
    }
    if (from_piece === 'P' && x != 0 && y < 7 && isBlack(board[x - 1][y + 1])) {
        moves.push([x - 1, y + 1]);
    }
    // same for 'p'
    if (from_piece === 'p' && x != 7 && y > 0 && isWhite(board[x + 1][y - 1])) {
        moves.push([x + 1, y - 1]);
    }
    if (from_piece === 'p' && x != 7 && y < 7 && isWhite(board[x + 1][y + 1])) {
        moves.push([x + 1, y + 1]);
    }


    // remove double move of pawn if it has moved
    if (from_piece === 'P' && x != 6) {
        moves = moves.filter(subArray => subArray[0] !== x - 2)
    }
    if (from_piece === 'p' && x != 1) {
        moves = moves.filter(subArray => subArray[0] !== x + 2)
    }

    console.log(moves)
    return moves


}

export function isValid(f, t, board, turn, cb) {

    let from_piece = board[f.srx][f.scx];
    let dest_piece = board[t.r][t.c];

    let [from_x, from_y] = [f.srx, f.scx];
    let [dest_x, dest_y] = [t.r, t.c];

    if (from_piece === '' || from_x === dest_x && from_y === dest_y) {
        cb('No piece selected');
        return
    }
    let possible_moves = getAllValidMoves(from_piece, from_x, from_y, board, turn);
    if (!possible_moves.some(subArray => subArray[0] === dest_x && subArray[1] === dest_y)) { // check if the destination move is valid
        cb("Not a valid move")
        return false
    }

    return true;

    if (isChecked(turn, board)) {
        
        if (board[dest_x][dest_y] == 'K' || board[dest_x][dest_y] == 'k') {
            alert("Checked, You can't eat the king")
            cb("checked")
            return false
        }
        
        if (isCheckmated(turn, board)) {
            alert("Checkmated");
            cb("Checkmated")
            return false
        }
        
        
        let future_board = board.map(row => [...row]);
        future_board[dest_x][dest_y] = future_board[from_x][from_y];
        future_board[from_x][from_y] = '';
        if (isChecked(turn, future_board)) {
            alert("The king will stay in check")
            cb("You can't move there")
            return false
        }


    }

}

function isChecked(turn, board) {
    let king = turn ? 'K' : 'k';
    let king_pos = [];
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (board[i][j] === king) {
                king_pos = [i, j];
                break;
            }
        }
    }

    let opponent_moves = [];
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (isOpponent(board[i][j], turn)) {
                let moves = getAllValidMoves(board[i][j], i, j, board, !turn);
                opponent_moves = opponent_moves.concat(moves);
            }
        }
    }
    return opponent_moves.some(subArray => subArray[0] === king_pos[0] && subArray[1] === king_pos[1]);
}

// to see if the game is checkmated
function isCheckmated(turn, board) {
    let king = turn ? 'K' : 'k';
    let king_pos = [];
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (board[i][j] === king) {
                king_pos = [i, j];
                break;
            }
        }
    }

    let king_moves = getAllValidMoves(king, king_pos[0], king_pos[1], board, turn);
    let future_board = board.map(row => [...row]);

    for (let i = 0; i < king_moves.length; i++) {
        let [x, y] = king_moves[i];
        future_board[x][y] = future_board[king_pos[0]][king_pos[1]];
        future_board[king_pos[0]][king_pos[1]] = '';
        if (!isChecked(turn, future_board)) {
            return false
        }
    }

    return true
}
