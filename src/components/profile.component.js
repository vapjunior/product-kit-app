import React, { Component } from "react";
import AuthService from "../services/auth.service";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser()
    };
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.user.name}</strong> Perfil
          </h3>
        </header>
        <p>
          <strong>Id:</strong>{" "}
          {currentUser.user.id}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {currentUser.user.email}
        </p>
      </div>
    );
  }
}