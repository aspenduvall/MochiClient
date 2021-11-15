import React from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import APIURL from "../../helpers/environment";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    fetch(`${APIURL}/users/login`, {
      method: "POST",
      body: JSON.stringify({
        user: { username: this.state.username, password: this.state.password },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.props.updateToken(data.sessionToken);
        this.props.getUserID(data.user.id);
        this.props.getUsername(data.user.username);
        this.props.getAdmin(data.user.isAdmin);
      });
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label htmlFor="username">username</Label>
            <Input
              onChange={(e) => this.setState({ username: e.target.value })}
              name="username"
              value={this.state.username}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">password</Label>
            <Input
              onChange={(e) => this.setState({ password: e.target.value })}
              type="password"
              name="password"
              value={this.state.password}
            />
          </FormGroup>
          <center>
            <br />
            <Button className="entrybuttons" type="submit">
              sign in
            </Button>
          </center>
        </Form>
      </div>
    );
  }
}
