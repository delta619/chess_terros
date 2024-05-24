import bKingSvg from '../assets/chess_icons/b_king.svg';
import bKnightSvg from '../assets/chess_icons/b_knight.svg';
import bBishopSvg from '../assets/chess_icons/b_bishop.svg';
import bPawnSvg from '../assets/chess_icons/b_pawn.svg';
import bQueenSvg from '../assets/chess_icons/b_queen.svg';
import wKingSvg from '../assets/chess_icons/w_king.svg';
import wKnightSvg from '../assets/chess_icons/w_knight.svg';
import wBishopSvg from '../assets/chess_icons/w_bishop.svg';
import wPawnSvg from '../assets/chess_icons/w_pawn.svg';
import wQueenSvg from '../assets/chess_icons/w_queen.svg';
import bRookSvg from '../assets/chess_icons/b_rook.svg';
import wRookSvg from '../assets/chess_icons/w_rook.svg';

export function getIcon(piece) {
    if (piece === '') return null; 

    // Black pieces
    if (piece === 'k') return <img style={{height:"100%", width:"100%"}} src={bKingSvg} alt="Black King" />;
    if (piece === 'n') return <img style={{height:"100%", width:"100%"}} src={bKnightSvg} alt="Black Knight" />;
    if (piece === 'b') return <img style={{height:"100%", width:"100%"}} src={bBishopSvg} alt="Black Bishop" />;
    if (piece === 'q') return <img style={{height:"100%", width:"100%"}} src={bQueenSvg} alt="Black Queen" />;
    if (piece === 'p') return <img style={{height:"100%", width:"100%"}} src={bPawnSvg} alt="Black Pawn" />;
    if (piece === 'r') return <img style={{height:"100%", width:"100%"}} src={bRookSvg} alt="Black Rook" />;

    // White pieces
    if (piece === 'K') return <img style={{height:"100%", width:"100%"}} src={wKingSvg} alt="White King" />;
    if (piece === 'N') return <img style={{height:"100%", width:"100%"}} src={wKnightSvg} alt="White Knight" />;
    if (piece === 'B') return <img style={{height:"100%", width:"100%"}} src={wBishopSvg} alt="White Bishop" />;
    if (piece === 'Q') return <img style={{height:"100%", width:"100%"}} src={wQueenSvg} alt="White Queen" />;
    if (piece === 'P') return <img style={{height:"100%", width:"100%"}} src={wPawnSvg} alt="White Pawn" />;
    if (piece === 'R') return <img style={{height:"100%", width:"100%"}} src={wRookSvg} alt="White Rook" />;

    return null; 
}
