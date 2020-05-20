import React from 'react'
import {Route, Switch, withRouter} from 'react-router-dom'
import { Link } from 'react-router-dom'

class GameListing extends React.Component {

    clicked = (event) => {
        console.log("clicked the listing")
    }

  
      render() {
        console.log(this.props.game)
        let player = ``
        if(this.props.game.whiteplayer){
            player = player.concat(this.props.game.whiteplayer.username)
        }
        if(this.props.game.blackplayer){
            player = player.concat(this.props.game.blackplayer.username)
        }
        return (
            <tbody class="listing" onClick={() => this.clicked()}>
              <td>{this.props.game.name}</td>
              <td>{player}</td>
              <td>creation time</td>
              
            </tbody>
            )
  }}
  
  export default withRouter(GameListing);