import React from 'react'
import { withRouter } from "react-router"
import Board from './Board.js'
import consumer from '../cable'

console.log("consumer", consumer)


class GameContainer extends React.Component {

    

    state = {
        name: `New Game`,
        pgn: ``,
        fen: [],
        whiteplayer_id: ``,
        blackplayer_id: ``,
        started: true,
        id: 0,
    }

    componentDidUpdate(){
        consumer.subscriptions.create({
            channel: "LobbyChannel",
            id: this.state.id
          }, {
            connected: () => console.log("connected to game feed"),
            disconnected: () => console.log("disconnected"),
            received: data => {
              console.log("received data:", data)
              let fixedFen = data.fen
                let fix2 = fixedFen.replace("[", "").replace("]", "").replace(/,/g, "").replace(/"/g, "")
                console.log("fix2", fix2)
                let realFixedFen
                if(fix2.includes(" ")){realFixedFen = fix2.split(' ')
                } else {realFixedFen = this.splitN(fix2, 4)} 
                console.log("realFixedFen", realFixedFen)
                console.log(typeof realFixedFen)
              this.setState({
                  fen: realFixedFen
              })

            },
          })
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
            blackplayer_id: thisGame.blackplayer_id,
            id: thisGame.id
        })
        console.log("state", this.state)
    }

    // toggleColor = () => {
    //   fetch(`http://localhost:3000/games/${this.state.id}`, {
    //     method: "PATCH",
    //     body: JSON.stringify({
    //       whiteplayer_id: this.state.blackplayer_id,
    //       blackplayer_id: this.state.whiteplayer_id
    //     }),
    //     credentials: "include",
    //     headers: {
    //       "Content-type": "application/json"
    //     }
    //   })
    //   .then(response => response.json())
    //   .then((newGameState) => {
    //     console.log("newGameState", newGameState)
    //     let fix2 = newGameState.fen.replace("[", "").replace("]", "").replace(/,/g, "").replace(/"/g, "")
    //     console.log("fix2", fix2)
    //     let realFixedFen
    //     if(fix2.includes(" ")){realFixedFen = fix2.split(' ')
    //     } else {realFixedFen = this.splitN(fix2, 4)} 
    //     console.log("realFixedFen", realFixedFen)
    //     console.log(typeof realFixedFen)
    //       this.setState({
    //         name: newGameState.name,
    //         pgn: newGameState.pgn,
    //         fen: realFixedFen,
    //         whiteplayer_id: newGameState.whiteplayer_id,
    //         blackplayer_id: newGameState.blackplayer_id,
    //         started: true,
    //         id: newGameState.id
    //       })
    //     })}
    
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
      // .then(response => response.json())
    }

    reset = () => {
      this.setState({
        fen: ["R@a1", "P@a2", "p@a7", "r@a8", "N@b1", "P@b2", "p@b7", "n@b8", "B@c1", "P@c2", "p@c7", "b@c8", "Q@d1", "P@d2", "p@d7", "q@d8", "K@e1", "P@e2", "p@e7", "k@e8", "B@f1", "P@f2", "p@f7", "b@f8", "N@g1", "P@g2", "p@g7", "n@g8", "R@h1", "P@h2", "p@h7", "r@h8"]
      })
      console.log("id", this.state.id)
      fetch(`http://localhost:3000/games/${this.state.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          fen: `["R@a1", "P@a2", "p@a7", "r@a8", "N@b1", "P@b2", "p@b7", "n@b8", "B@c1", "P@c2", "p@c7", "b@c8", "Q@d1", "P@d2", "p@d7", "q@d8", "K@e1", "P@e2", "p@e7", "k@e8", "B@f1", "P@f2", "p@f7", "b@f8", "N@g1", "P@g2", "p@g7", "n@g8", "R@h1", "P@h2", "p@h7", "r@h8"]`
        }),
        credentials: "include",
        headers: {
          "Content-type": "application/json"
        }
      })
      .then(response => response.json())
    }


  
    render() {
      const thisGame = this.props.games.filter(game => game.id === parseInt(this.props.location.pathname.match(/\d+/)))[0]
      let names
      if(thisGame.blackplayer && thisGame.whiteplayer){
        names = `Game between ${thisGame.blackplayer.username} and ${thisGame.whiteplayer.username}`
      }
        return (
            <div className="game">
              <div className="row">
                <div className="column">
                  <Board onMovePiece={this.onMovePiece} pieces={this.state.fen}/>
                </div>
                <div className="column">
                <br/><br/><br/><br/><br/><br/>
                <h2>{names}</h2>
                {/* <div className="playerlabel">
                Black: {thisGame.blackplayer.username}
                </div> */}
                <br/><br/>
                  
                    {/* <button id="switchsides" onClick={this.toggleColor}> Switch Sides </button> */}
                  <button id="gamereset" onClick={this.reset}>Reset the board</button>
                  {/* <div className="playerlabel">
                  White: {thisGame.whiteplayer.username}
                  </div> */}
                </div>
              </div>
            </div>
            
          )
        }
    }



export default withRouter(GameContainer);