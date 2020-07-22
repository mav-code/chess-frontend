import React from 'react'
import { withRouter } from "react-router"
import Board from './Board.js'
import consumer from '../cable'
console.log("consumer", consumer)


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
    const myName = this.props.currentUser.username
    const title = `${myName}'s game`
    this.setState({
      name: title,
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
        const myGames = this.props.games.filter(game => !(game.whitePlayer && game.blackPlayer) && ((game.whiteplayer_id === this.props.currentUser.id) || (game.blackplayer_id === this.props.currentUser.id)))
        // const thisGame = this.props.currentUser.games.filter(game => !(game.whitePlayer && game.blackPlayer))
        console.log("in cancel", myGames)
        myGames.forEach((game) =>
            {fetch(`http://localhost:3000/games/` + game.id, {
                method: "DELETE"
            })
            .then(r => r.json())
            .then(function (response) {
            if (!response.ok) {
              const waitText = document.getElementById("waiting")
              waitText.style.display = "none"
              return Promise.reject('some reason');

            }

            this.props.handleDeleteGame(game)
            // return response.json();
    
    })
    // .then(json => {return json})
    })
    document.getElementById("create").disabled = false
    document.getElementById("myCheck").disabled = false
    document.getElementById("tablename").disabled = false
    document.getElementById("newreset").disabled = false
  }
    
    
    createTable = () => {
        console.log("submitting game")
        document.getElementById("create").disabled = true
        document.getElementById("myCheck").disabled = true
        document.getElementById("tablename").disabled = true
        document.getElementById("newreset").disabled = true
        const waitText = document.getElementById("waiting")
        waitText.style.display = "block"
        fetch('http://localhost:3000/games', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Accept: 'application/json',
        },
        credentials: "include",
        body: JSON.stringify(this.state)
      })
        .then(r => r.json())
        .then(newGame => {
          console.log("newGame", newGame)
          this.props.handleAddGame(newGame)
            consumer.subscriptions.create({
              channel: "LobbyChannel",
              id: newGame.id
            }, {
              connected: () => console.log("connected to game feed"),
              disconnected: () => console.log("disconnected"),
              received: data => {
                console.log("received data:", data)
                if(data.whiteplayer_id && data.blackplayer_id){
                  this.props.history.push(`/games/${data.id}`)
                }
                }
          
              },
            )
        })
        .catch(err => alert(err))
    }

    handleNameChange = (event) => {
      this.setState({name: event.target.value});
    }

    reset = () => {
      this.setState({
        fen: ["R@a1", "P@a2", "p@a7", "r@a8", "N@b1", "P@b2", "p@b7", "n@b8", "B@c1", "P@c2", "p@c7", "b@c8", "Q@d1", "P@d2", "p@d7", "q@d8", "K@e1", "P@e2", "p@e7", "k@e8", "B@f1", "P@f2", "p@f7", "b@f8", "N@g1", "P@g2", "p@g7", "n@g8", "R@h1", "P@h2", "p@h7", "r@h8"]
      })
    }


    render() {
        console.log("in new game container", this.props.currentUser)
        return (
          <div className="gamesetup">
            <div className="row">
              <div className="column">
                <Board onMovePiece={this.onMovePiece} pieces={this.state.fen}/>
                <p className="boardlabel">Edit the board by moving pieces!</p>
                <button id="newreset" onClick={this.reset}>Reset the board</button>
              </div>
              <div className="column">
                <br/><br/>Table Name:<br/><br/>
                <input id="tablename" type="text" value={this.state.name} onChange={this.handleNameChange} />
                <br/><br/>
                <label className="switch">
                  <input id="myCheck" type="checkbox" onClick={this.toggleColor}/>
                  <span className="slider"></span>
                </label>
                <br/><br/>
                <p id="black">I want to play as black</p>
                <p id="white">I want to play as white</p>
                <br/>
                <button id="create" onClick={this.createTable}>Create Table</button>
                <br/>
                <br/>
                <div id="waiting">
                  <button onClick={this.cancelTable}>Cancel</button>
                  <br/>
                  <p>Waiting for someone to join...</p>
                </div>
              </div>
            </div>
          </div>
          
        )
      }
  }
  
  export default withRouter(NewGameContainer);