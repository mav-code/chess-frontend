import React from 'react'
import { withRouter } from "react-router"
import Board from './Board.js'

class GameContainer extends React.Component {

    state = {
        name: `New Game`,
        pgn: ``,
        fen: [],
        whiteplayer_id: ``,
        blackplayer_id: ``,
        started: true
    }

    splitN(s, n) {
        var output = [];
        for (var i = 0; i < s.length; i+=n) {
            output.push(s.substr(i, n));
        }
        return(output);
    }

    componentDidMount(){
        console.log("this.props.games", this.props.games)
        console.log("[0]", this.props.games.filter(game => game.id === parseInt(this.props.location.pathname.match(/\d+/)))[0])
        const thisGame = this.props.games.filter(game => game.id === parseInt(this.props.location.pathname.match(/\d+/)))[0]
        console.log("thisGame.fen", thisGame.fen)
        let fixedFen = thisGame.fen
        let fix2 = fixedFen.replace("[", "").replace("]", "").replace(/,/g, "").replace(/"/g, "")
        console.log("fix2", fix2)
        let realFixedFen
        if(fix2.includes(" ")){realFixedFen = fix2.split(' ')
        } else {realFixedFen = this.splitN(fix2, 4)} 
        console.log("realFixedFen", realFixedFen)
        console.log(typeof realFixedFen)
        this.setState({
            name: thisGame.name,
            fen: realFixedFen,
            whiteplayer_id: thisGame.whiteplayer_id,
            blackplayer_id: thisGame.blackplayer_id
        })
        console.log("state", this.state)
    }

    toggleColor = () => {
            this.setState({
              whiteplayer_id: this.state.blackplayer_id,
              blackplayer_id: this.state.whiteplayer_id
      })}
    
      onMovePiece = (piece, fromSquare, toSquare) => {
        const thisGame = this.props.games.filter(game => game.id === parseInt(this.props.location.pathname.match(/\d+/)))[0]
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
      console.log("this.state", this.state)
      console.log("this.state.fen", this.state.fen)
      fetch(`http://localhost:3000/games/${thisGame.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          fen: this.state.fen.toString()
        }),
        credentials: "include",
        headers: {
          "Content-type": "application/json"
        }
      })
      .then(response => response.json())

    
    }

  
    render() {
        return (
            <div class="game">
              <Board onMovePiece={this.onMovePiece} pieces={this.state.fen}/>
              <label class="switch">
                  <input id="myCheck" type="checkbox" onClick={this.toggleColor}/>
                  <span class="slider"></span>
              </label>
              <p id="black">Switch sides</p>
              </div>
            
          )
        }
    }



export default withRouter(GameContainer);