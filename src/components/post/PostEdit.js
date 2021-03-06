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

export default class PostEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editTitle: "",
      editContent: "",
      editTags: "",
      editImage: "",
      modal: false,
    };
  }

  componentDidUpdate(prevProps) {
    if(this.props.title !== prevProps.title) {
      this.fetchData(this.props.title);
    }
  }

  postUpdate = (event, post) => {
    event.preventDefault();
    fetch(`${APIURL}/posts/edit/${this.props.postToUpdate.id}`, {
      method: "PUT",
      body: JSON.stringify({
        post: {
          title: this.state.editTitle,
          content: this.state.editContent,
          image: this.state.editImage,
          tags: this.state.editTags,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.token,
      }),
    }).then((res) => {
      this.props.fetchPosts();
      this.toggle();
    });
  };

  updateImage = (url) => {
    this.setState({editImage: url})
  }

  toggle = () => this.setState({ modal: !this.state.modal });

  render() {
    return (
      <div>
        <Button style={{float: "right"}} color="danger" onClick={this.toggle}>
          Edit
        </Button>
        <Modal isOpen={this.state.modal}>
          <ModalBody>
            <Form onSubmit={this.postUpdate}>
              <FormGroup>
                <Label htmlFor="title">edit title</Label>
                <Input
                  name="title"
                  defaultValue={this.props.title}
                  onChange={(e) => this.setState({ editTitle: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="content">edit content</Label>
                <Input
                  name="content"
                  type="textarea"
                  defaultValue={this.props.content}
                  onChange={(e) =>
                    this.setState({ editContent: e.target.value })
                  }
                />
              </FormGroup>
              <FormGroup>
              <Uploading 
                image={this.state.editImage}
                updateImage={this.updateImage} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="tags">edit tags</Label>
                <Input
                  name="tags"
                  defaultValue={this.props.tags}
                  value={this.state.editTags}
                  onChange={(e) => this.setState({ editTags: e.target.value })}
                />
              </FormGroup>
              <Button type="submit">edit</Button>
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
