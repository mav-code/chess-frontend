import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import LoginForm from './LoginForm.js'

class LoginBlock extends React.Component {

    newGame = (event) => {
        this.props.history.push(`/new/`)
    }

    toggleLogin = (event) => {
      const login = document.querySelector(".smallform")
      if (login.style.display !== "block") {
        login.style.display = "block";
        } else {
        login.style.display = "none";
        }
    }

    handleLogout = () => {
      fetch("http://localhost:3000/logout", {
        method: "POST",
        credentials: "include"
      })
        .then(r => r.json())
        .then(() => {
          this.props.handleUpdateCurrentUser(null)
        })
    }

    render() {
      return (
            <>
              <Link to="/signup">
                <button className="rightalign">Sign Up</button>
              </Link>
                <button  className="rightalign" onClick={this.toggleLogin}>Log in</button>
              <LoginForm handleUpdateCurrentUser={this.props.handleUpdateCurrentUser} />
            </>
      )
    }
}

export default withRouter(LoginBlock);