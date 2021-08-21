import React from 'react'
import styled from 'styled-components'

const Square = styled.div`
  border: 1px solid black;
  position: relative;
  height: 34px;
  width: 34px;
  margin: 0px;
  padding: 0;
  background: none;

  ${props => props.y === 0 && `border-top:2px solid black;`} // 修正線太細
  ${props => props.x === 0 && `border-left:2px solid black;`} // 修正線太細

  ${props => props.y === 17 && `border-bottom:2px solid black;`} // 修正線太細
  ${props => props.x === 17 && `border-right:2px solid black;`} // 修正線太細

  ${props =>
    props.y === 18 &&
    `border:none;margin-left:2px;`} // 修正多出來的一格，不讓它顯示，修正棋子偏移
  ${props => props.x === 18 && `border:none;`} // 修正多出來的一格，不讓它顯示
`
const ChessHover = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 50%;
  top: -55%;
  left: -55%;
  z-index: 1;
  &:hover {
    background: radial-gradient(#ffff00, rgba(0, 0, 0, 0));
    cursor: pointer;
  }
`
const Chess = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 50%;
  top: -58%;
  left: -58%;
  z-index: 1;
  ${props =>
    props.chessColor === 'black' &&
    `background: black;animation: fadeInBlack ease-in-out 0.3s;
    border: black solid 2px;transform: scale(0.8);`}
  ${props =>
    props.chessColor === 'white' &&
    `background: white;animation: fadeInWhite ease-in-out 0.3s;
    border: black solid 2px;transform: scale(0.8);`}
  @keyframes fadeInBlack {
    0% {
      opacity: 0%;
    }
    50% {
      background: black;
      transform: scale(1.2);
    }
    100% {
      opacity: 100%;
    }
  }
  @keyframes fadeInWhite {
    0% {
      opacity: 0%;
    }
    50% {
      background: white;
      transform: scale(1.2);
    }
    100% {
      opacity: 100%;
    }
  }
`

export default function Unit(props) {
  const { y, x, addChess, board, nextColor } = props // 獲取從 map 弄出來的 y x 傳過來這邊
  const chessColor = board[y][x]
  // 因為 board 上面記錄的是 white black， board[y][x] 可以取出是哪個顏色的字串，傳入 Chess render 顏色
  return (
    <>
      <Square
        x={x}
        y={y}
        onClick={() => {
          addChess(y, x, nextColor)
        }}
      >
        <Chess chessColor={chessColor} />
        <ChessHover></ChessHover>
      </Square>
    </>
  )
}
