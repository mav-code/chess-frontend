import React from 'react'
import { withRouter } from "react-router"

class NewGameContainer extends React.Component {

    render() {
        console.log("in new game container", this.props.currentUser)
        return (
          <div class="gamesetup">
            New Game Area
            <Chessboard position="start"/>

          </div>
          
        )
      }
  }
  
  export default withRouter(NewGameContainer);