import React from 'react'
// will I need route, switch, link?
import {withRouter} from 'react-router-dom'


class GameListing extends React.Component {


  
      render() {
        console.log("created_at", this.props.game.created_at)
        let players
        let open = `Click to join!`
        if(this.props.game.whiteplayer && this.props.game.blackplayer){
            players = `${this.props.game.whiteplayer.username}, ${this.props.game.blackplayer.username}`
            open = `full`
        }
        else if(this.props.game.whiteplayer){
            players = `${this.props.game.whiteplayer.username}`
        }
        else if(this.props.game.blackplayer){
            players = `${this.props.game.blackplayer.username}`
        }
        return (
            <tr class="listing" id={this.props.game.id} onClick={() => this.props.handleJoinGame(this.props.game)}>
              <td class="name">{this.props.game.name}</td>
              <td class="players">{players}</td>
              <td>{this.props.game.created_at.substring(6,10)}, {this.props.game.created_at.substring(11,19)}</td>
              <td>{open}</td>
            </tr>
            )
  }}
  
  export default withRouter(GameListing);