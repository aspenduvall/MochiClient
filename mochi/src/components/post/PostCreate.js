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
import Uploading from "../Uploading";
import APIURL from "../../helpers/environment";

export default class PostCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      image: "",
      tags: "",
      postID: "",
      modal: false,
    };
  }

  handleSubmit = (e) => {
    fetch(`${APIURL}/posts/new`, {
      method: "POST",
      body: JSON.stringify({
        post: {
          title: this.state.title,
          content: this.state.content,
          image: this.state.image,
          tags: this.state.tags,
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

  updateImage = (url) => {
    this.setState({image: url})
  }

  toggle = () => this.setState({ modal: !this.state.modal });

  render() {
    return (
      <div>
        <center>
          <button class="postbutton" onClick={this.toggle}>create a post</button>
        </center>
        <Modal isOpen={this.state.modal}>
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label htmlFor="title" />
                title
                <Input
                  name="title"
                  value={this.state.title}
                  onChange={(e) => this.setState({ title: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="content" />
                content
                <Input
                  type="textarea"
                  name="content"
                  value={this.state.content}
                  onChange={(e) => this.setState({ content: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="image" />
                <Uploading 
                image={this.state.image}
                updateImage={this.updateImage} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="tags" />
                tags
                <Input
                  name="tags"
                  value={this.state.tags}
                  onChange={(e) => this.setState({ tags: e.target.value })}
                />
              </FormGroup>
              <Button type="submit">post</Button>
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
