import React from 'react';
import Header from './header/Header.js';
import Lobby from './Lobby.js';
import NewGameContainer from './NewGameContainer.js';
import GameContainer from './GameContainer.js';
import SignupForm from './SignupForm.js';
import {Route, Switch, withRouter} from 'react-router-dom'

class App extends React.Component {
  state = {
    currentUser: null,
    games: [],
    loading: true
  }

  

  newGame = (event) => {
    if(this.state.currentUser){
    this.props.history.push(`/new/`)
    } else {
      const warn = document.getElementById("warn")
      if(warn){
        warn.style.color = "white"
        setTimeout(() => {  warn.style.color = "black" }, 200)
      }
    }
}

  handleUpdateCurrentUser = user => {
    this.setState({
      currentUser: user
    })
    if(this.state.loading){
    this.setState({
      loading: false
    })
  }}

  handleAddGame = (game) => {
    console.log("game in handleaddgame", game)
    const newGames = [...this.state.games, game]
    console.log("newGames in handleAddGame", newGames)
    this.setState({
      games: newGames
    })
  }

  handleDeleteGame = (game) => {
    const newGames = [...this.state.games]
    for( var i = 0; i < newGames.length; i++){ if ( newGames[i].id === game.id) { newGames.splice(i, 1); }}
    this.setState({
      games: newGames
    })
  }

  componentWillUnmount() {
    clearInterval(this.timer)
    this.timer = null
  }

    componentDidMount() {
      this.getItems()
      // this.timer = setInterval(()=> this.getItems(), 10000)
    }

    getItems(){
      fetch(`http://localhost:3000/games/`)
        .then(r => r.json())
        .then(gamesArray => {
          const array2 = gamesArray.sort(function(a, b){return b.id - a.id})
          this.setState({
            games: array2,
            loading: false
          })
          console.log("in app cdm", gamesArray)
        })
        fetch(`http://localhost:3000/autologin/`, {
          credentials: "include"
        })
        .then(r => r.json())
        .then(user => this.setState({currentUser: user}))
    }

    handleJoinGame = (game) => {
      console.log("this.state.currentUser", this.state.currentUser)
      console.log("players", game.whiteplayer, game.blackplayer)
      if(game.whiteplayer && !game.blackplayer){
        console.log("yes white no black")
        fetch(`http://localhost:3000/games/${game.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          blackplayer_id: this.state.currentUser.id
        }),
        credentials: "include",
        headers: {
          "Content-type": "application/json"
        }
      })
      .then(response => response.json())
      .then(this.props.history.push(`/games/${game.id}`))
      } else if (game.blackplayer && !game.whiteplayer){
        console.log("yes black no white")
        fetch(`http://localhost:3000/games/${game.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          whiteplayer_id: this.state.currentUser.id
        }),
        credentials: "include",
        headers: {
          "Content-type": "application/json"
        }
      })
      .then(response => response.json())
      .then(json => this.props.history.push(`/games/${game.id}`))
      } else if (game.blackplayer && game.whiteplayer && this.state.currentUser){
        if((game.whiteplayer.id === this.state.currentUser.id) || (game.blackplayer.id === this.state.currentUser.id)){
          this.props.history.push(`/games/${game.id}`)
        }} else {
          console.log("last else")
        const full = document.getElementById(game.id).lastChild
        full.style.color = "white"
        setTimeout(() => {  full.style.color = "black" }, 200)
      }}



  render() {
  console.log("app state", this.state)
  return (
  <>
    <Header handleUpdateCurrentUser={this.handleUpdateCurrentUser} newGame={this.newGame} currentUser={this.state.currentUser}/>
    <main>
      <Switch>
        <Route exact path='/' render={(routeProps) => <Lobby loading={this.state.loading} games={this.state.games} handleJoinGame={this.handleJoinGame} handleAddGame={this.handleAddGame} currentUser={this.state.currentUser} {...routeProps} />} />
        <Route exact path='/new' render={(routeProps) => <NewGameContainer handleAddGame={this.handleAddGame} handleDeleteGame={this.handleDeleteGame} currentUser={this.state.currentUser} games={this.state.games}{...routeProps} />} />
        <Route exact path='/signup' render={(routeProps) => <SignupForm handleUpdateCurrentUser={this.handleUpdateCurrentUser} {...routeProps} />} />
        <Route path='/games' render={(routeProps) => <GameContainer currentUser={this.state.currentUser} games={this.state.games} {...routeProps} />} />
      </Switch>
    </main>
    
  </>
  );
}
}

export default withRouter(App);
