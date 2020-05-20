import React from 'react';
import Header from './header/Header.js';
import {Route, Switch, withRouter} from 'react-router-dom'

class App extends React.Component {
  state = {
    currentUser: null,
    games: []
  }

  handleUpdateCurrentUser = user => {
    this.setState({
      currentUser: user
    })}

    componentDidMount() {
      fetch(`http://localhost:3000/games/`)
        .then(r => r.json())
        .then(gamesArray => {
          this.setState({
            games: gamesArray
          })
          console.log("in app cdm", gamesArray)
        })
        fetch(`http://localhost:3000/autologin/`, {
          credentials: "include"
        })
        .then(r => r.json())
        .then(user => this.setState({currentUser: user}))
    }




  render() {
  console.log("app state", this.state)
  return (
  <>
    <Header handleUpdateCurrentUser={this.handleUpdateCurrentUser} currentUser={this.state.currentUser}/>
    <main>
      <Switch>
        {/* <Route exact path='/login' render={(routeProps) => <LoginForm handleUpdateCurrentUser={this.handleUpdateCurrentUser} {...routeProps} />} />
        <Route exact path='/signup' render={(routeProps) => <SignupForm handleUpdateCurrentUser={this.handleUpdateCurrentUser} {...routeProps} />} />
        <Route path='/boards' render={(routeProps) => <PostContainer posts={this.state.posts} {...routeProps} renderNewPost={this.renderNewPost} currentUser={this.state.currentUser}  /> } />
        <Route path='/posts' render={(routeProps) => <CommentContainer posts={this.state.posts} {...routeProps} currentUser={this.state.currentUser} />} />
        <Route path='/profile' render={(routeProps) => <ProfilePage {...routeProps} />} /> */}
      </Switch>
    </main>
    
  </>
  );
}
}

export default withRouter(App);
