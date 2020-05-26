import React from 'react'
import { withRouter } from "react-router"
// // don't think I need reactDOM here
// const ReactDOM = require('react-dom')
const Chess = require('react-chess')

class Board extends React.Component {

    render() {
        return (
          <div class="board">
            <Chess pieces={this.props.pieces} onMovePiece={this.props.onMovePiece}/>
          </div>
          
        )
      }
  }
  
  export default withRouter(Board);