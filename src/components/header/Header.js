import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import LoginBlock from './LoginBlock.js'

class Header extends React.Component {


    newGame = (event) => {
        this.props.history.push(`/new/`)
    }

    handleLogout = () => {
        fetch("http://localhost:3000/logout", {
          method: "POST",
          credentials: "include"
        })
          .then(r => r.json())
          .then(() => {
            this.props.handleUpdateCurrentUser(null)
            this.props.history.push("/")
          })
      }

    render() {
        let welcome
        if(this.props.currentUser){
            welcome = [<div id="right"> Welcome! Join or create a table <button class="rightalign" onClick={this.handleLogout}>Logout {this.props.currentUser.username}</button></div>]
        } else {
            welcome = <LoginBlock handleUpdateCurrentUser={this.props.handleUpdateCurrentUser} currentUser={this.props.currentUser} />
        }
      
      return (
        <header>
            <Link to="/">
            <img id="logo" class="icon" src={process.env.PUBLIC_URL + '/stolenlogo.png'} />
            <h4 class="pagetitle">Sandbox Chess</h4>
            </Link>
            <button class="rightalign" onClick={this.newGame}>Create New Table</button>
            {welcome}
      </header>
      )
    }
}

export default withRouter(Header);