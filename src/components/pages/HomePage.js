import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Header, Button, Segment, Grid, Divider } from "semantic-ui-react";
import friends from "../../assets/images/friends.JPG";


const HomePageHeader = () => (
  <Segment
    vertical
    textAlign="center"
    style={{
      minHeight: 400,
      padding: "1em 0em ",
      background:
        "linear-gradient(154deg, #1e002d, #1e002d, darkslategray)",
      border: "none",
      boxShadow: "0 0 11px 0"
    }}
  >

    <Container text>
      <Header
        content="Mulligan"
        inverted
        style={{
          fontSize: "6em",
          fontWeight: "normal",
          marginTop: "1em",
          marginBottom: "0.5em",
          fontFamily: "Ananda",
          color: "#fbbd08"
        }}
      />
      <Button size="huge" color="orange" inverted as={Link} to="/signup" >
        Join Today
    </Button>
    </Container>
  </Segment >
);

class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    const { isAuthenticated } = this.props;
    if (isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    return (
      <div>
        <HomePageHeader />
        <Grid>
          <Grid.Column width={9} style={{ padding: "100px 100px 0 100px" }}>
            <Header style={{ fontSize: "3em" }}>
              {"What is Mulligan?"}
            </Header>
            <Divider />
            <Segment basic>
              <div style={{ fontSize: "1.3em", lineHeight: "1.4em" }}>
                <div style={{ marginBottom: "10px" }}>
                  {"Mulligan is a golf application for smart golfers!"}<br />
                  {"Mulligan lets you: "}
                </div>
                <div style={{ display: "list-item" }}>
                  {"Register and save your golf rounds"}
                </div>
                <div style={{ display: "list-item" }}>
                  {"Keep track of your round statistics"}
                </div>
                <div style={{ display: "list-item" }}>
                  {"Connect with your Mulligan friends"}
                </div>
                <div style={{ marginTop: "30px" }}>
                  {"Sign up today for free!"}
                </div>
              </div>
            </Segment>
          </Grid.Column>
          <Grid.Column width={7}>
            <img src={friends} alt="logo" style={{ width: "100%", zIndex: "-1" }} />
          </Grid.Column>
        </Grid>
      </div >
    )
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.email
  }
}


HomePage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
}


export default connect(mapStateToProps)(HomePage);
