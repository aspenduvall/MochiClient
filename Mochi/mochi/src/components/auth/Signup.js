import React from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import APIURL from "../../helpers/environment";

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      username: "",
      email: "",
      password: "",
      modal: false,
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    fetch(`${APIURL}/users/signup`, {
      method: "POST",
      body: JSON.stringify({
        user: {
          name: this.state.name,
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
        },
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
        this.toggle();
      });
  };

  toggle = () => this.setState({ modal: !this.state.modal });

  render() {
    return (
      <div>
        <center>
          <button class="entrybuttons" onClick={this.toggle}>sign up</button>
        </center>
        <Modal isOpen={this.state.modal}>
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label htmlFor="name">display name</Label>
                <Input
                  onChange={(e) => this.setState({ name: e.target.value })}
                  name="name"
                  value={this.state.name}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="username">username</Label>
                <Input
                  onChange={(e) => this.setState({ username: e.target.value })}
                  name="username"
                  value={this.state.username}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="email">email</Label>
                <Input
                  onChange={(e) => this.setState({ email: e.target.value })}
                  name="email"
                  value={this.state.email}
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
              <Button className="button" type="submit">
                sign up
              </Button>
              <button
                type="button"
                class="closebuttons"
                onClick={this.toggle}
              >
                Close
              </button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
