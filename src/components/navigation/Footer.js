import React from "react";
import { Menu, Container, Segment, Button, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

// Should just be visibile for authenticated users

const Footer = () => (
    <div style={{ marginTop: "5em", boxShadow: "0 0 11px 0" }}>
        <Segment
            inverted
            attached="top, bottom"
            style={{ display: "block", background: "#1e002d", height: "6em", border: "none" }}
            vertical
        >

            <Container>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        Mulligan
                        Mulligan
                    </div>
                    <div>
                        <Button
                            circular
                            size="big"
                            inverted
                            icon="github"
                            as="a"
                            href="https://github.com/InspectorDeno/mulligan-react"
                            style={{ boxShadow: "0 0 0 3px #fff inset !important" }}
                        />
                        <Button
                            circular
                            size="big"
                            inverted
                            icon="gitlab"
                            as="a"
                            href="https://gitlab.ida.liu.se/dendu933/TDDD27_2018_Mulligan"
                            style={{ boxShadow: "0 0 0 3px #fff inset !important" }}
                        />
                    </div>
                </div>

            </Container>
        </Segment>
    </div>
);

Footer.propTypes = {
};


export default Footer
