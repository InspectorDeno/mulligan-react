import React, { Component } from "react";
import { Segment, Header, Container } from "semantic-ui-react";
import header from "../../assets/images/titleist.png";

// Hard coded golf courses to choose from 
class GolfClubsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      golfClubData: [],
      loading: false,
      error: ""
    };
  }

  PageHeader = () => (
    <div style={{ marginBottom: "30px" }}>
      <img src={header} alt="logo" style={{ width: "100%", boxShadow: "0 0 11px 0" }} />
      <Segment compact style={{
        marginTop: "-60px",
        border: "none",
        textAlign: "center",
        background: "rgb(255,255,255)",
        marginLeft: "40px",
        boxShadow: "none",
        borderRadius: "20px"
      }}>
        <Header style={{
          fontSize: "4em",
          fontWeight: "normal",
          padding: "20px",
          fontFamily: "Ananda",
          color: "#1e002d"
        }}>
          Golf Clubs
     </Header>
      </Segment>
    </div>
  );

  render() {

    return (
      <div>
        <this.PageHeader />
        <Container>
          <Segment basic>
            <Header>
              {"This functionality is yet to be implemented!"}
            </Header>
            <div style={{ fontSize: "1.1em" }}>
              {"This page will contain a map where you will be able to search for nearby golf clubs"}
              {" and get their contact information "}
            </div>
          </Segment>
        </Container>
      </div>
    );
  }
}



export default GolfClubsPage;
