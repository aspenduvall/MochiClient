import React, { useState } from "react";
import { Input, FormGroup, Form } from "reactstrap";

export default class Uploading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "uxqwjfgz");
    this.setState = { loading: true };
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dgdpk8wko/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const File = await res.json();

    console.log(File.secure_url);
    this.props.updateImage(File.secure_url);
    this.setState={ loading: false };
  };

  render() {
    return (
      <div>
        upload your file
        <FormGroup>
          <Input
            type="file"
            name="file"
            placeholder="upload"
            onChange={this.uploadImage}
          />
          {this.state.loading ? (
            <h3>Loading ...</h3>
          ) : (
            <img src={this.props.image} style={{ width: "370px" }} />
          )}
        </FormGroup>
      </div>
    );
  }
}
