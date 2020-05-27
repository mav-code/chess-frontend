import React from 'react'
// will I need route, switch, link?
import {withRouter} from 'react-router-dom'


class GameListing extends React.Component {


  
      render() {
        let players
        let open = `Click to join!`
        let time = `Just now`
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
        if(this.props.game.created_at){
            time = `${this.props.game.created_at.substring(6,10)}, ${this.props.game.created_at.substring(11,19)}`
        }
        return (
            <tr className="listing" id={this.props.game.id} onClick={() => this.props.handleJoinGame(this.props.game)}>
              <td className="name">{this.props.game.name}</td>
              <td className="players">{players}</td>
              <td>{time}</td>
              <td>{open}</td>
            </tr>
            )
  }}
  
  export default withRouter(GameListing);