import React from 'react'
import { withRouter } from "react-router"
// // don't think I need reactDOM here
// const ReactDOM = require('react-dom')
const Chess = require('react-chess')

class Board extends React.Component {


    // onMovePiece = (piece, fromSquare, toSquare) => {
    //     console.log(piece, fromSquare, toSquare)
    //     const toDelete = piece.notation
    //     const toAdd = piece.name + `@` + toSquare
    //     const filtered = this.state.pieces.filter(function(value, index, arr){ return value !== toDelete;})
    //     filtered.push(toAdd)
    //     console.log("filtered", filtered)
    //     this.setState({
    //         pieces: filtered
    //     })
    // }

    componentDidMount(){
        this.setState({
            pieces: ["R@a1", "P@a2", "p@a7", "r@a8", "N@b1", "P@b2", "p@b7", "n@b8", "B@c1", "P@c2", "p@c7", "b@c8", "Q@d1", "P@d2", "p@d7", "q@d8", "K@e1", "P@e2", "p@e7", "k@e8", "B@f1", "P@f2", "p@f7", "b@f8", "N@g1", "P@g2", "p@g7", "n@g8", "R@h1", "P@h2", "p@h7", "r@h8"]
          })
    }

    render() {
        console.log(Chess.getDefaultLineup())
        return (
          <div class="board">
            <Chess pieces={this.props.pieces} onMovePiece={this.props.onMovePiece}/>
          </div>
          
        )
      }
  }
  
  export default withRouter(Board);