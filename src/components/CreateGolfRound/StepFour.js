import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, FieldArray, formValueSelector, arrayPush } from "redux-form";
import { Segment, List, Grid, Form, Label } from 'semantic-ui-react';
import moment from "moment";
import InlineError from "../messages/InlineError"


class StepFour extends Component {

    componentDidMount() {
        const { golfscores } = this.props;
        // Push only once
        if (!golfscores.length) {
            const { golfclubdata } = this.props;
            golfclubdata.forEach((hole, index) => {
                this.props.dispatch(arrayPush("createGolfRound", "golfholes",
                    {
                        number: hole.number,
                        index: hole.index,
                        par: hole.par
                    }));
                this.props.dispatch(arrayPush("createGolfRound", "golfscores", { hole: index + 1 }));
            })
        }
    }

    renderInput = ({ input, type, meta, error }) => (
        <div>
            {/* {<p>{JSON.stringify(meta, 2, 0)}</p>} */}
            {error && error.length && meta.submitFailed && <InlineError text={error} />}
            <div>
                <Form.Input
                    {...input}
                    type={type}
                    style={{ width: "100%" }} />
            </div>
        </div>
    );

    renderStrokes = ({ fields, meta, players }) => (
        <List style={{ display: "flex", justifyContent: "center" }}>
            <div>
                {fields.map((golfhole, index) => (
                    <Segment raised compact inverted style={{ width: "660px", background: "#c3d646" }}
                    >
                        <List.Item key={index} style={{ background: "white", width: "auto" }}>

                            {/* {/* The actual score grid */}
                            <div style={{ fontSize: "25px", fontWeight: "bold", width: "auto", background: "#c3d646" }}
                            >Hole {index + 1}</div>

                            <Grid celled="internally" style={{
                                // display: "inline-grid", 
                                // gridTemplateColumns: "min-content"
                            }}>
                                {/* First row */}
                                <Grid.Row style={{ background: "#c3d646" }}>
                                    <Grid.Column style={{ width: "100px" }}>
                                        <h3>Player</h3>
                                    </Grid.Column>
                                    {players.map(player => (
                                        <Grid.Column style={{ width: "130px" }}>
                                            <h3>{player.playerName}</h3>
                                        </Grid.Column>
                                    ))}
                                </Grid.Row>
                                {/* Second Row */}
                                <Grid.Row>
                                    <Grid.Column style={{ width: "100px", color: "darkslategray" }}>
                                        <h3>Strokes</h3>
                                    </Grid.Column>
                                    {players.map(player => (
                                        <Grid.Column style={{ width: "130px", padding: "0.5em" }}>
                                            <Field
                                                name={`${golfhole}.${player.playerName}.score`}
                                                type="number"
                                                component={this.renderInput}
                                                error={meta.error && meta.error[index] && meta.error[index].length && meta.error[index]}
                                            />

                                        </Grid.Column>
                                    ))}
                                </Grid.Row>
                                {/* Putts */}
                                <Grid.Row>
                                    <Grid.Column style={{ width: "100px", color: "darkslategray" }}>
                                        <h3>Putts</h3>
                                    </Grid.Column>
                                    {players.map(player => (
                                        <Grid.Column style={{ width: "130px", padding: "0.5em" }}>
                                            <Field
                                                name={`${golfhole}.${player.playerName}.putts`}
                                                type="number"
                                                component={this.renderInput}
                                            />

                                        </Grid.Column>
                                    ))}
                                </Grid.Row>
                            </Grid>
                        </List.Item>
                    </Segment>
                ))}
            </div>
        </List>

    )

    render() {
        const { golfclub, golfdate, golfplayers, golfclubdata } = this.props;
        return (
            <div>
                <Label ribbon size="huge" color="orange">How did it go?</Label>
                <FieldArray name="golfscores" component={this.renderStrokes} players={golfplayers} />
            </div>
        );
    }
}

StepFour.propTypes = {
    dispatch: PropTypes.func.isRequired,
    golfclub: PropTypes.string,
    golfclubdata: PropTypes.arrayOf(PropTypes.object),
    golfplayers: PropTypes.arrayOf(PropTypes.object),
    golfscores: PropTypes.arrayOf(PropTypes.object),
    golfdate: PropTypes.string,
}

StepFour.defaultProps = {
    golfclub: "",
    golfclubdata: [],
    golfplayers: [],
    golfscores: [],
    golfdate: ""
}

const selector = formValueSelector('createGolfRound');
StepFour = connect(state => {
    const golfclub = selector(state, "golfclub");
    const golfdate = moment(selector(state, "golfdate")).toLocaleString();
    const golfplayers = selector(state, "golfplayers");
    const golfscores = selector(state, "golfscores");
    return {
        golfclub,
        golfdate,
        golfplayers,
        golfscores,
        user: state.user,
        golfclubdata: state.golfclub.items
    }
})(StepFour)

export default StepFour;