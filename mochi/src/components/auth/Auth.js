import React from "react";
import { Container, Row, Col } from "reactstrap";
import Login from "./Login";
import Signup from "./Signup";

const Auth = (props) => {
  return (
    <div class="wrapper">
      <div class="title">
        <h1>mochi</h1>
      </div>
      <Container className="login">
        <Row>
          <Col>
            <Login
              updateToken={props.updateToken}
              getUserID={props.getUserID}
              getUsername={props.getUsername}
              getAdmin={props.getAdmin}
            />
            <br />
            <Signup
              updateToken={props.updateToken}
              getUserID={props.getUserID}
              getUsername={props.getUsername}
              getAdmin={props.getAdmin}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Auth;
