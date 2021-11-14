import React from "react";
import { Container, Row, Col } from "reactstrap";
import CommentCreate from "./CommentCreate";
import CommentTable from "./CommentTable";

export default class CommentIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: "",
      updateActive: false,
      commentToUpdate: "",
    };
    this.fetchComments = this.fetchComments.bind(this);
  }

  fetchComments = () => {
    fetch(`http://localhost:3000/comments/${this.props.postID}`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          comments: data,
        });
      });
  };
  editComment = (comments) => {
    this.setState({ commentToUpdate: comments });
  };

  updateOn = () => {
    this.setState({ updateActive: true });
  };

  updateOff = () => {
    this.setState({ updateActive: false });
  };

  componentDidMount = () => {
    this.fetchComments();
  };

  render() {
    return (
      <div>
            <CommentCreate
              fetchComments={this.fetchComments}
              token={this.props.token}
              postID={this.props.postID}
            />
            <CommentTable
              comments={this.state.comments}
              editComment={this.editComment.bind(this)}
              updateOn={this.updateOn.bind(this)}
              fetchComments={this.fetchComments}
              token={this.props.token}
              userID={this.props.userID}
              username={this.props.username}
              admin={this.props.admin}
              postID={this.props.postID}
            />
          </div>
    );
  }
}
