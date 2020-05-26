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
            welcome = ["Welcome!", <button onClick={this.handleLogout}>Logout {this.props.currentUser.username}</button>]
        } else {
            welcome = <LoginBlock handleUpdateCurrentUser={this.props.handleUpdateCurrentUser} currentUser={this.props.currentUser} />
        }
      
      return (
        <header>
            <Link to="/">
                  LOGO
            </Link>
            <button onClick={this.newGame}>Create New Table</button>
            {welcome}
      </header>
      )
    }
}

export default withRouter(Header);