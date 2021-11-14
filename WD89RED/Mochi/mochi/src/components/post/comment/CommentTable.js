import React from "react";
import { Button, Modal, ModalBody, ModalHeader, Table } from "reactstrap";
import CommentEdit from "./CommentEdit";

export default class CommentTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentToUpdate: "",
      username: "",
      modal: false,
    };
  }
  deleteComment = (comment) => {
    debugger
    fetch(`http://localhost:3000/comments/delete/${comment.id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.token,
      }),
    })
      .then(() => {
        this.props.fetchComments();
        this.toggle();
      })
      .catch((e) => console.log(e));
  };

  commentByPostID = (comment) => {
    fetch(`http://localhost:3000/comments/${this.props.postID}`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.props.fetchComments();
        this.setState({
          comments: data,
        });
      });
  };

  editComment = (comment) => {
    this.setState({ commentToUpdate: comment });
  };

  updateOn = () => {
    this.setState({ updateActive: true });
  };

  updateOff = () => {
    this.setState({ updateActive: false });
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  componentDidMount() {
    this.commentByPostID();
  }

  commentMapper = () => {
    const isAdmin = localStorage.getItem("admin");
    return this.props.comments.length > 0
      ? this.props.comments.map((comment, index) => {
        this.props.comments.sort(function (a, b) {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        });
          const canEdit =
            comment.userId === Number(this.props.userID) || isAdmin === "true";
          return (
            <div class="comment" key={index}>
              <sup>posted by {this.props.username}, at {comment.createdAt}</sup>
              <p>{comment.comment}</p>
              {canEdit ? (
                <div>
                  <CommentEdit
                    commentToUpdate={comment}
                    updateOff={this.props.updateOff}
                    token={this.props.token}
                    fetchComments={this.props.fetchComments}
                    admin={this.props.admin}
                  />
                  <Button
                    color="danger"
                    onClick={() => {
                      this.deleteComment(comment);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              ) : null}
            </div>
          );
        })
      : null;
  };
  render() {
    return (
      <div>
        <a class="commentlinks" onClick={this.toggle}>
          view comments,&nbsp;
        </a>
        <Modal isOpen={this.state.modal}>
          <h4>comments</h4>
          <ModalBody>
            {this.commentMapper()}
            <button type="button" class="closebuttons" onClick={this.toggle}>
              Close
            </button>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
