import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import LoginForm from './LoginForm.js'

class LoginBlock extends React.Component {

    newGame = (event) => {
        this.props.history.push(`/new/`)
    }

    toggleLogin = (event) => {
      const login = document.querySelector(".smallform")
      if (login.style.display === "none") {
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
            
            <button onClick={this.toggleLogin}>Log in</button>
            <LoginForm handleUpdateCurrentUser={this.props.handleUpdateCurrentUser} />
            <Link to="/signup">
                  <button>Sign Up</button>
            </Link>
                </>

        /* <div className="actions">
          {this.props.currentUser ? (
            <>
            <Link to='/profile'>
              <button>Profile</button>
            </Link>
            <button onClick={this.handleLogout}>Logout {this.props.currentUser.username}</button>
            </>
          ) : (
              <>
                <Link to="/login">
                  <button>Login</button>
                </Link>
                <Link to="/signup">
                  <button>Sign Up</button>
                </Link>
              </>
            )}
        </div> */
      )
    }
}

export default withRouter(LoginBlock);