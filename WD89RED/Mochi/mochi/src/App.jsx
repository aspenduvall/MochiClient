import React, { Component } from "react";
import Sitebar from "./components/Sitebar";
import Auth from "./components/auth/Auth";
import PostIndex from "./components/post/PostIndex";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionToken: "",
      userID: "",
      username: "",
      admin: "",
    };
  }

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.setState({
        sessionToken: localStorage.getItem("token"),
        username: localStorage.getItem("username"),
        admin: localStorage.getItem("admin"),
        userID: localStorage.getItem("userID"),
      });
    }
  }

  getUserID = (userID) => {
    localStorage.setItem("userID", userID);
    this.setState({
      userID: userID,
    });
  };

  getUsername = (username) => {
    localStorage.setItem("username", username);
    this.setState({
      username: username,
    });
  };

  getAdmin = (admin) => {
    localStorage.setItem("admin", admin);
    this.setState({
      admin: admin,
    });
  };

  updateToken = (newToken) => {
    localStorage.setItem("token", newToken);
    this.setState({
      sessionToken: newToken,
    });
  };

  clearToken = () => {
    localStorage.clear();
    this.setState({
      sessionToken: "",
    });
  };

  protectedViews = () => {
    return this.state.sessionToken === localStorage.getItem("token") ? (
      <div>
        <Sitebar clickLogout={this.clearToken.bind(this)} />
        <div class="wrapper">
          <PostIndex
            token={this.state.sessionToken}
            getUserID={this.getUserID}
            getUsername={this.getUsername}
            getAdmin={this.getAdmin}
            username={this.state.username}
            admin={this.state.admin}
            userID={this.state.userID}
          />
        </div>
      </div>
    ) : (
      <Auth
        updateToken={this.updateToken.bind(this)}
        getUserID={this.getUserID}
        getUsername={this.getUsername}
        getAdmin={this.getAdmin}
      />
    );
  };
  render() {
    return (
      <div>
        <div class="wrapper">{this.protectedViews()}</div>
      </div>
    );
  }
}
