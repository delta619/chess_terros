export function isWhite(piece) {
    if (piece == '') return false;
    return piece === piece.toUpperCase();
}

export function isBlack(piece) {
    if (piece == '') return false;
    return piece === piece.toLowerCase();
}

export function isOpponent(piece, turn) {
    if (piece == '') return false;
    return turn ? isBlack(piece) : isWhite(piece);

}

export function buzzCell(r, c) {
    let clickedCell = document.getElementsByClassName('cell')[r * 8 + c];
    clickedCell.classList.add('buzz'); // Add a CSS class for buzzing
    setTimeout(() => {
        clickedCell.classList.remove('buzz'); // Remove the CSS class after a short delay
    }, 200); // Adjust the duration of buzzing as needed


}

export function getDirectionHash() {
    return {
        "0:0": 1,
        "0:-1": 1,
        "0:1": 1,
        "-1:0": 1,
        "-1:-1": 1,
        "-1:1": 1,
        "1:0": 1,
        "1:-1": 1,
        "1:1": 1
    }
}