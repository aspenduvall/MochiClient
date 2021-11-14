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

export default class CommentEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editComment: "",
      modal: false,
    };
  }

  commentUpdate = (event, comment) => {
    event.preventDefault();
    fetch(
      `http://localhost:3000/comments/edit/${this.props.commentToUpdate.id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          comment: {
            comment: this.state.editComment,
          },
        }),
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: this.props.token,
        }),
      }
    ).then((res) => {
      this.props.fetchComments();
      this.toggle();
    });
  };

  toggle = () => this.setState({ modal: !this.state.modal });

  render() {
    return (
      <div>
        <Button style={{float: "right"}} color="danger" onClick={this.toggle}>
          Edit
        </Button>
        <Modal isOpen={this.state.modal}>
          <ModalBody>
            <Form onSubmit={this.commentUpdate}>
              <FormGroup>
                <Label htmlFor="comment">edit comment</Label>
                <Input
                  name="comment"
                  type="textarea"
                  value={this.state.editComment}
                  onChange={(e) =>
                    this.setState({ editComment: e.target.value })
                  }
                />
              </FormGroup>
              <Button type="submit">update</Button>
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
