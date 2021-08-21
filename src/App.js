import React from 'react'
import styled from 'styled-components'
import Unit from './Unit'

const { useState, useEffect } = React
const Row = styled.div`
  clear: both;
  content: '';
  display: flex;
  margin: 0 auto;
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`
const Navbar = styled.div`
  margin-left: 50px;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
`
const Title = styled.div`
  font-size: 80px;
  color: black;
`
const OtherInformation = styled.div`
  display: flex;
  font-size: 35px;
  margin-top: 43px;
`
const RestartButton = styled.button`
  width: 180px;
  color: white;
  font-size: 20px;
  padding: 8px;
  background: #fc6586;
  border-radius: 10px;
  border: #fc3251 solid 2px;
  margin-left: 40px;
`

const ChessBoard = styled.div`
  position: relative;
  margin-top: 19px;
  width: 690px;
  margin-left: 150px;
  border: 2px solid black;
  padding-top: 38px;
  padding-left: 38px;
  ${(
    props // shake1 shake2 是因為如果是同一個名字的話，只會觸發第一次而已
  ) => props.nextColor === 'white' && `animation: shake1 100ms ease-in-out;`}
  ${props =>
    props.nextColor === 'black' && `animation: shake2 100ms ease-in-out;`}
  @keyframes shake1 {
    0% {
    }
    50% {
      transform: scale(0.995);
    }
    100% {
    }
  }
  @keyframes shake2 {
    0% {
    }
    50% {
      transform: scale(0.996);
    }
    100% {
    }
  }
  ${props =>
    props.winner &&
    `&::after {
    content:'';
    display:block;
    width:100%;
    height:100%;
    background-color: rgba(252,101,134,0.35);
    position:absolute;
    top:0;
    left:0;
    z-index:2;
  }`}
`
const WinnerMetal = styled.div`
  ${props =>
    props.winner &&
    `color: black;
font-size: 50px;
margin-top:70px;
width:460px;
text-align:center;
border: solid #fc3251 4px;
border-radius: 20px;
padding: 10px;
animation: metalPop ease-in-out 800ms;

`}
  @keyframes metalPop {
    10%,
    90% {
      transform: scale(1.1);
    }
    20%,
    80% {
      transform: translate3d(+2px, 0, 0);
    }
    30%,
    70% {
      transform: scale(1.25);
    }
    40%,
    60% {
      transform: translate3d(+2px, 0, 0);
    }
    50% {
      transform: scale(1.3);
    }
  }
`
function App() {
  const SIZE = 19
  const [board, setBoard] = useState(Array(SIZE).fill(Array(SIZE).fill(null)))
  const [nextColor, setNextColor] = useState('black')
  const [currentY, setCurrentY] = useState(0)
  const [currentX, setCurrentX] = useState(0)
  const [winner, setWinner] = useState(null)
  const addChess = (y, x, nextColor) => {
    if (board[y][x] !== null) return
    if (winner) return
    const newBoard = JSON.parse(JSON.stringify(board))
    setCurrentY(y)
    setCurrentX(x)
    newBoard[y][x] = nextColor
    setBoard(newBoard)
    nextColor === 'black' ? setNextColor('white') : setNextColor('black')
  }
  function checkWinneer() {
    if (
      countSame(direction.right) + countSame(direction.left) === 4 ||
      countSame(direction.up) + countSame(direction.down) === 4 ||
      countSame(direction.leftUp) + countSame(direction.rightDown) === 4 ||
      countSame(direction.rightUp) + countSame(direction.leftDown) === 4
    ) {
      setWinner(nextColor === 'black' ? '白棋' : '黑棋')
    }
  }
  const direction = {
    right: [0, 1],
    left: [0, -1],
    up: [-1, 0],
    down: [1, 0],
    leftUp: [-1, -1],
    rightDown: [1, 1],
    rightUp: [-1, 1],
    leftDown: [1, -1],
  }
  function countSame(direction) {
    const [yDirection, xDirection] = direction // yDirection, xDirection 是要檢查的方向
    let willCheckX = currentX + xDirection // currentX 是拿來定位剛剛下在哪裡的
    let willCheckY = currentY + yDirection // currentY 是拿來定位剛剛下在哪裡的
    let checkColor = null // checkColor 是上一手的顏色， nextColor 是正在思考要下哪裡的顏色
    let counter = 0 // 看有幾個相同
    nextColor === 'black' ? (checkColor = 'white') : (checkColor = 'black') // 設定 checkColor
    while (
      willCheckX >= 0 &&
      willCheckY >= 0 &&
      willCheckX < 19 &&
      willCheckY < 19
    ) {
      if (board[willCheckY][willCheckX] === checkColor) {
        // 被檢查的顏色，和上一手相同那就計數器＋＋
        counter++ // 這個方向已經找到一個相同的了，就繼續找看還有沒有相同的
        willCheckX = willCheckX + xDirection // 設定下一次的要搜尋的 x
        willCheckY = willCheckY + yDirection // 設定下一次的要搜尋的 y
      } else {
        // 如果不是相同的，那就沒有必要找下去，終止這個 while loop
        break // 退出循環
      }
    }
    return counter // 回傳「這個方向」總共數到幾個相同的棋子
  }
  function handleRestartClick() {
    window.location.reload()
  }
  useEffect(() => {
    checkWinneer()
  }, [nextColor])

  return (
    <div className="App">
      <Wrapper>
        <ChessBoard nextColor={nextColor} winner={winner}>
          {board.map((row, y) => {
            return (
              <Row key={y} y={y}>
                {row.map((noUse, x) => {
                  return (
                    <Unit
                      key={x}
                      y={y}
                      x={x}
                      addChess={addChess}
                      board={board}
                      nextColor={nextColor}
                    />
                  )
                })}
              </Row>
            )
          })}
        </ChessBoard>
        <Navbar>
          <Title>超級五子棋</Title>
          <OtherInformation>
            {nextColor === 'black' ? '黑棋' : '白棋'}，該你下了
            <RestartButton onClick={handleRestartClick}>
              不算啦，重來一次
            </RestartButton>
          </OtherInformation>
          <WinnerMetal winner={winner}>
            {winner ? `恭喜${winner}獲勝🎊🎉🥳這是一盤精采的對戰` : ``}
          </WinnerMetal>
        </Navbar>
      </Wrapper>
    </div>
  )
}

export default App
