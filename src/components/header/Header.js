import React from 'react'
import { Link } from 'react-router-dom'

//random comment so I can commit

class Header extends React.Component {


    render() {
      
      return (
        <header>
            This is the header
        {/* <div className="actions">
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
        </div> */}
      </header>
      )
    }
}

export default Header;