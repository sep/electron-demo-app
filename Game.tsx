import React from 'react'

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          Board goes here
          {/* <Board /> */}
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

export default Game