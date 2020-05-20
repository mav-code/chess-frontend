import React from 'react'
import { withRouter } from "react-router"
import Board from './Board.js'
// import {ChessBoard} from 'chessboardjs';
// import * as $ from 'jquery'; 


class NewGameContainer extends React.Component {

state = {
    fen: ['R@h1', 'P@f2', 'q@d8', 'R@a1', 'P@a2', 'P@c2', 'b@c8', 'p@d7', 'Q@d1', 'n@g8'],
    whiteplayer: ``,
    blackplayer: ``
}

componentDidMount(){
    this.setState({
        fen: ["R@a1", "P@a2", "p@a7", "r@a8", "N@b1", "P@b2", "p@b7", "n@b8", "B@c1", "P@c2", "p@c7", "b@c8", "Q@d1", "P@d2", "p@d7", "q@d8", "K@e1", "P@e2", "p@e7", "k@e8", "B@f1", "P@f2", "p@f7", "b@f8", "N@g1", "P@g2", "p@g7", "n@g8", "R@h1", "P@h2", "p@h7", "r@h8"],
        whiteplayer: this.props.currentUser.id
      })
}

toggleColor() {
    const checkBox = document.getElementById("myCheck");
    const black = document.getElementById("black");
    const white = document.getElementById("white");
    if (checkBox.checked == true){
      black.style.display = "block";
      white.style.display = "none";
    // working here right now
      //   this.setState({
    //       whiteplayer: ``
    //       blackplayer
    //   })
  } else {
      white.style.display = "block";
      black.style.display = "none";
  }
  }

  onMovePiece = (piece, fromSquare, toSquare) => {
    console.log(piece, fromSquare, toSquare)
    const toDelete = piece.notation
    const toAdd = piece.name + `@` + toSquare
    const filtered = this.state.fen.filter(function(value, index, arr){ return value !== toDelete;})
    filtered.push(toAdd)
    console.log("filtered", filtered)
    this.setState({
        fen: filtered
    })}

    createTable = () => {
        console.log("submitting game")
  
      fetch(`http://localhost:3000/games`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(this.state)
      })
        .then(r => r.json())
        .then(newPost => {
          console.log(newPost)
          this.setState(initialState)
          this.props.renderNewPost(newPost)
          this.props.showPost(newPost.id)
        })
    }


    render() {
        console.log("in new game container", this.props.currentUser)
        return (
          <div class="gamesetup">
            New Game
            <br></br>
            Edit the Board:
            <Board onMovePiece={this.onMovePiece} pieces={this.state.fen}/>
            <label class="switch">
                <input id="myCheck" type="checkbox" onClick={this.toggleColor}/>
                <span class="slider"></span>
            </label>
            <p id="black">I want to play as black</p>
            <p id="white">I want to play as white</p>
            <button onClick={this.createTable}>Create Table</button>
          </div>
          
        )
      }
  }
  
  export default withRouter(NewGameContainer);