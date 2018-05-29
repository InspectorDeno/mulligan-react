import React from "react";
import { Segment, Header, Container, Icon } from "semantic-ui-react";

const PageHeader = () => (
    <Segment
        vertical
        textAlign="center"
        style={{
            height: "106vh",
            background:
                "linear-gradient(154deg, #1e002d, #1e002d, darkslategray)",
            border: "none",
        }}
    >

        <Container text>
            <Header
                inverted
                icon
                style={{
                    fontSize: "6em",
                    fontWeight: "normal",
                    marginTop: "1em",
                    marginBottom: "0.5em",
                    color: "#fbbd08"
                }}
            >
                <Icon name="x" style={{ fontSize: "1em" }} />
                Whoops...
            </Header>
            <Header
                inverted
                style={{
                    fontSize: "3em",
                    fontWeight: "normal",
                    marginTop: "1em",
                    color: "white"
                }}
            >
                404 - This page was not found
            </Header>
        </Container>
    </Segment >
);

const ErrorPage = () => (
    <div>
        <PageHeader />
    </div>
);

export default ErrorPage;
