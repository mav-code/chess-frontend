import React from 'react'
import {   withRouter } from 'react-router-dom'

class LoginForm extends React.Component {
  state = {
    username: "",
    password: ""
  }

  newGame = (event) => {
    this.props.history.push(`/new/`)
}

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
   
      fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify(this.state)
      })
      .then(r => {
        if (!r.ok) {
          throw r
        }
        return r.json()
      })
      .then(user => {
        this.props.handleUpdateCurrentUser(user)
        this.props.history.push(`/`)
        })
  }
  
    render() {
      const { username, password } = this.state

      return (
        <div className="smallform">
        <form onSubmit={this.handleSubmit}>
          <label>Username:</label><br/>
          <input type="text" name="username" onChange={this.handleInputChange} value={username} /><br/>
          <label>Password:</label><br/>
          <input type="password" name="password" onChange={this.handleInputChange} value={password} /><br/>
          <input type="submit" value="Login" />
        </form>
      </div>
      )
    }
}

export default withRouter(LoginForm);