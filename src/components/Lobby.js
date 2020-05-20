import React from 'react'
import GameListing from './GameListing.js'
import { withRouter } from "react-router"

class Lobby extends React.Component {

    render() {
        console.log("in pc render", this.props.games)
        return (
          <div class="listingcontainer">
          <table>
            <thead>
              <th>Game Name</th>
              <th>Player</th>
              <th>Created at</th>
            </thead>
            {this.props.games.map(game => <GameListing key={game.id} game={game} currentUser={this.props.currentUser}/>)}
          </table>
          </div>
          
        )
      }
  }
  
  export default withRouter(Lobby);