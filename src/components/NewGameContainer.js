import React from 'react'
import { withRouter } from "react-router"
import Board from './Board.js'
// import {ChessBoard} from 'chessboardjs';
// import * as $ from 'jquery'; 


class NewGameContainer extends React.Component {

state = {
    name: `Table Name`,
    pgn: ``,
    fen: ['R@h1', 'P@f2', 'q@d8', 'R@a1', 'P@a2', 'P@c2', 'b@c8', 'p@d7', 'Q@d1', 'n@g8'],
    whiteplayer_id: ``,
    blackplayer_id: ``,
    started: false
}

componentDidMount(){
    this.setState({
        fen: ["R@a1", "P@a2", "p@a7", "r@a8", "N@b1", "P@b2", "p@b7", "n@b8", "B@c1", "P@c2", "p@c7", "b@c8", "Q@d1", "P@d2", "p@d7", "q@d8", "K@e1", "P@e2", "p@e7", "k@e8", "B@f1", "P@f2", "p@f7", "b@f8", "N@g1", "P@g2", "p@g7", "n@g8", "R@h1", "P@h2", "p@h7", "r@h8"],
        whiteplayer_id: this.props.currentUser.id
      })
}

toggleColor = () => {
    const checkBox = document.getElementById("myCheck");
    const black = document.getElementById("black");
    const white = document.getElementById("white");
    if (checkBox.checked === true){
      black.style.display = "block";
      white.style.display = "none";
        this.setState({
          whiteplayer_id: ``,
          blackplayer_id: this.props.currentUser.id
      })
  } else {
      white.style.display = "block";
      black.style.display = "none";
      this.setState({
        whiteplayer_id: this.props.currentUser.id,
        blackplayer_id: ``
    })
  }
  }

  onMovePiece = (piece, fromSquare, toSquare) => {
    const newPieces = this.state.fen
    .map((curr, index) => {
      if (piece.index === index) {
        return `${piece.name}@${toSquare}`
      } else if (curr.indexOf(toSquare) === 2) {
        return false
      }
      return curr
    })
    .filter(Boolean)

  this.setState({fen: newPieces})
}

    cancelTable= () => {
        console.log("this.props.games", this.props.games)
        console.log("this.props.currentUser", this.props.currentUser)
        const thisGame = this.props.currentUser.games.filter(game => !(game.whitePlayer && game.blackPlayer))
        console.log("in cancel", thisGame)
        thisGame.forEach((game) =>
            {fetch(`http://localhost:3000/games` + `/` + game.id, {
                method: "DELETE"
            })
    .then(r => r.json())
    .then(function (response) {
        if (!response.ok) {
            return Promise.reject('some reason');
        }
    
        return response.json();
    
    })
    // .then(json => {return json})
    })}
    
    
    createTable = () => {
        console.log("submitting game")
        document.getElementById("create").disabled = true
        const waitText = document.getElementById("waiting")
        waitText.style.display = "block"
      fetch(`http://localhost:3000/games`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(this.state)
      })
        .then(r => r.json())
        .then(newGame => {
          console.log("newGame", newGame)
        })
    }

    handleNameChange(event) {
      this.setState({name: event.target.value});
    }


    render() {
        console.log("in new game container", this.props.currentUser)
        return (
          <div class="gamesetup">
            <input type="text" value={this.state.name} onChange={this.handleNameChange} />
            <br></br>
            Edit the Board:
            <Board onMovePiece={this.onMovePiece} pieces={this.state.fen}/>
            <label class="switch">
                <input id="myCheck" type="checkbox" onClick={this.toggleColor}/>
                <span class="slider"></span>
            </label>
            <p id="black">I want to play as black</p>
            <p id="white">I want to play as white</p>
            <button id="create" onClick={this.createTable}>Create Table</button>
            <div id="waiting">
            <button onClick={this.cancelTable}>Cancel</button>
            <p>Waiting for someone to join...</p>
            </div>
          </div>
          
        )
      }
  }
  
  export default withRouter(NewGameContainer);