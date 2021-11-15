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
import APIURL from "../../../helpers/environment";

export default class CommentCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      comment: "",
      modal: false,
    };
  }

  handleSubmit = (e) => {
    fetch(`${APIURL}/comments/new`, {
      method: "POST",
      body: JSON.stringify({
        comment: {
          username: localStorage.getItem("username"),
          comment: this.state.comment,
          postId: this.props.postID,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.toggle();
      });
  };

  toggle = () => this.setState({ modal: !this.state.modal });

  render() {
    return (
      <div>
        <a class="commentlinks" onClick={this.toggle}>comment</a>
        <Modal isOpen={this.state.modal}>
          <ModalBody>
            <h4>leave a comment</h4>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label htmlFor="comment" />
                <Input
                type="textarea"
                  name="comment"
                  value={this.state.comment}
                  onChange={(e) => this.setState({ comment: e.target.value })}
                />
              </FormGroup>
              <Button type="submit">comment</Button>
              <button type="button" class="closebuttons" onClick={this.toggle}>
                Close
              </button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
