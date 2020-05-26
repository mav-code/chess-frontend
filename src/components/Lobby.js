import React from 'react'
import GameListing from './GameListing.js'
import { withRouter } from "react-router"
// import consumer from '../cable'

// console.log("consumer", consumer)

// consumer.subscriptions.create({
//   channel: "LobbyChannel"
// }), {
//   connected: () => console.log("connected"),
//   disconnected: () => console.log("disconnected"),
//   received: fen => {
//     console.log("received fen:", fen)
//     // setTweets(tweets => ({
//     //   ...tweets,
//     //   newTweets: [tweet, ...tweets.newTweets]
//     // }))
//   },
// }

class Lobby extends React.Component {

  sortTable(n) {
    console.log("in sorting")
    let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("table");
    switching = true;
    dir = "asc";
    while (switching) {
    switching = false;
    if(table){
    rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
          shouldSwitch = false;
    x = rows[i].getElementsByTagName("TD")[n];
          y = rows[i + 1].getElementsByTagName("TD")[n];
          if (dir == "asc") {
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
              shouldSwitch = true;
              break;
    }
          } else if (dir == "desc") {
            if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
              shouldSwitch = true;
              break;
    }
          }
    }
        if (shouldSwitch) {
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;
    switchcount ++;
    } else {
          if (switchcount == 0 && dir == "asc") {
            dir = "desc";
    switching = true;
        }
  }
  }}
  }

    render() {
        console.log("in pc render", this.props.games)
        console.log("currentUser", this.props.currentUser)
        let loading
        let message
        if(this.props.currentUser){
          message = "Start or join a game!"
        } else {
          message = "Log in to start or join a game!"
        }
        if(this.props.loading){
          loading = <h3 class="loading">loading...</h3>
        }
        return (
          <div className="listingcontainer">
          <br/>
          <h2>Lobby</h2>
          <br/>
          {message}
          <br/>
          <br/>
          <table id="table">
            <tr>
              <th class="name" onClick={() => this.sortTable(0)}>Game Name</th>
              <th class="players" onClick={() => this.sortTable(1)}>Players</th>
              <th onClick={() => this.sortTable(2)}>Created at</th>
              <th onClick={() => this.sortTable(3)}>Join</th>
            </tr>
            {loading}
            {this.props.games.map(game => <GameListing key={game.id} game={game} handleJoinGame={this.props.handleJoinGame} currentUser={this.props.currentUser}/>)}
          </table>
          </div>
          
        )
      }
  }
  
  export default withRouter(Lobby);