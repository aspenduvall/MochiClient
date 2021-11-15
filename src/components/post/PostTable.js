import React from "react";
import { Table, Button, Modal, ModalBody, Form, FormGroup } from "reactstrap";
import PostEdit from "./PostEdit";
import CommentIndex from "./comment/CommentIndex";
import APIURL from "../../helpers/environment";

export default class PostTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: "",
      postToUpdate: "",
      updateActive: false,
      modal: false,
    };
  }

  deletePost = (post) => {
    fetch(`${APIURL}/posts/delete/${post.id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.token,
      }),
    })
      .then((data) => {
        this.props.fetchPosts();
        this.props.getPostID(data.post.id);
      })
      .catch((e) => console.log(e));
  };

  getPostID = (postID) => {
    localStorage.setItem("postID", postID);
    this.setState({
      postID: postID,
    });
  };

  componentDidMount() {
    this.getPostID();
    this.setState({
      postID: localStorage.getItem("postID"),
    });
  }

  toggle = () => this.setState({ modal: !this.state.modal });

  postMapper = () => {
    const isAdmin = localStorage.getItem("admin");
    return this.props.posts.length > 0
      ? this.props.posts.map((post, index) => {
          this.props.posts.sort(function (a, b) {
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          });
          const canEdit =
            post.userId === Number(this.props.userID) || isAdmin === "true";
            console.log(post.user.username)
          return (
            <div class="content" key={index}>
              <p class="postusername">posted by {post.user.username}, at {post.createdAt}</p>
              <br />
              <br />
              <h3>{post.title}</h3>
              <br />
              <p>{post.content}</p>
              <div>
                <img
                  class="postimage"
                  src={`${post.image}`}
                  onClick={this.toggle}
                />
                {/* <Modal centered size="lg" isOpen={this.state.modal}>
                  <ModalBody>
                    <img class="postimagezoom" src={`${post.image}`} />
                    <br />
                    <br />
                    <button
                      type="button"
                      class="closebuttons"
                      onClick={this.toggle}
                    >
                      Close
                    </button>
                  </ModalBody>
                </Modal> */}
              </div>
              <sup>{post.tags}</sup>
              <CommentIndex
                postID={post.id}
                userID={this.props.userID}
                username={this.props.username}
                admin={this.props.admin}
                updateOff={this.props.updateOff}
                token={this.props.token}
              />
              <br />
              <br />
              {canEdit ? (
                <div>
                  <PostEdit
                    postToUpdate={post}
                    updateOff={this.props.updateOff}
                    token={this.props.token}
                    fetchPosts={this.props.fetchPosts}
                    editPost={this.props.editPost}
                    admin={this.props.admin}
                  />
                  <Button
                    color="danger"
                    onClick={() => {
                      this.deletePost(post);
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
    return <>{this.postMapper()}</>;
  }
}
