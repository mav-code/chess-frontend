import React from 'react'
import GameListing from './GameListing.js'
import { withRouter } from "react-router"
import consumer from '../cable'

console.log("consumer", consumer)

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
        return (
          <div className="listingcontainer">
          <table id="table">
            <tr>
              <th onClick={() => this.sortTable(0)}>Game Name</th>
              <th onClick={() => this.sortTable(1)}>Player</th>
              <th onClick={() => this.sortTable(2)}>Created at</th>
              <th onClick={() => this.sortTable(3)}>Join</th>
            </tr>
            {this.props.games.map(game => <GameListing key={game.id} game={game} handleJoinGame={this.props.handleJoinGame} currentUser={this.props.currentUser}/>)}
          </table>
          </div>
          
        )
      }
  }
  
  export default withRouter(Lobby);