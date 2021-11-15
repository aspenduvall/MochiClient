import React from "react";
import { Container, Row, Col } from "reactstrap";
import PostCreate from "./PostCreate";
import PostTable from "./PostTable";
import APIURL from "../../helpers/environment";

export default class PostIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: "",
      updateActive: false,
      postToUpdate: "",
      postID: "",
    };
  }

  fetchPosts = () => {
    fetch(`${APIURL}/posts/`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          posts: data,
        });
      });
  };
  editPost = (posts) => {
    this.setState({ postToUpdate: posts });
  };

  updateOn = () => {
    console.log("hey");
    this.setState({ updateActive: true });
  };

  updateOff = () => {
    this.setState({ updateActive: false });
  };

  componentDidMount() {
    this.fetchPosts();
  }

  render() {
    return (
      <div>
        <PostCreate fetchPosts={this.fetchPosts} token={this.props.token} />
        <PostTable
          posts={this.state.posts}
          editPost={this.editPost}
          updateOn={this.updateOn.bind(this)}
          fetchPosts={this.fetchPosts}
          token={this.props.token}
          userID={this.props.userID}
          username={this.props.username}
          admin={this.props.admin}
        />
      </div>
    );
  }
}
