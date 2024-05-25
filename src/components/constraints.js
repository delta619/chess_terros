
/*
Returns true if the move is possible, false otherwise
*/

var valid_moves = {
    'p': [[1, 0], [2, 0]],
    'P': [[-1, 0], [-2, 0]],
}

var valid_attack = {
    'p': [[1, 1], [1, -1]],
    'P': [[-1, 1], [-1, -1]],
}

export function getAllMoves(from_piece, x, y) {

    let moves = []

    for (let i = 0; i < valid_moves[from_piece].length; i++) {
        moves.push([x + valid_moves[from_piece][i][0], y + valid_moves[from_piece][i][1]])
    }

    // console.log(moves)
    return moves


}

export function isValid(f, t, board, cb) {



    let from_piece = board[f.srx][f.scx];
    let dest_piece = board[t.r][t.c];

    let [from_x, from_y] = [f.srx, f.scx];
    let [dest_x, dest_y] = [t.r, t.c];


    // console.log(from_piece);
    // console.log(dest_piece);

    // console.log(from_x, from_y);
    // console.log(dest_x, dest_y);

    // console.log(board)

    if (from_piece === '' || from_x == dest_x && from_y == dest_y) {
        cb('No piece selected');
        return
    }

    if (dest_piece == "") {
        // find poosible moves sample space and validate the dest position in the sample space
        let possible_moves = getAllMoves(from_piece, from_x, from_y);
        console.log(possible_moves);
        console.log(dest_x, dest_y);

        if (possible_moves.some(subArray => subArray[0] === dest_x && subArray[1] === dest_y)) {
            return true
        } else {
            cb("Not a valid move")
            return false
        }

    } else {
        // its an attack, so check if the piece is in the way along with the valid position for attack
    }




    return true
}