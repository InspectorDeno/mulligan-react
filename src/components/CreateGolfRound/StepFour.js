import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, FieldArray, formValueSelector, arrayPush } from "redux-form";
import { Segment, List, Table, Form, Label, Grid, Dropdown, Sticky, Rail } from 'semantic-ui-react';
import { sortBy } from "underscore";
import InlineError from "../messages/InlineError"

const driveOptions = [
    { key: "fairway", value: "fairway", text: "Fairway" },
    { key: "long", value: "long", text: "Long" },
    { key: "left", value: "left", text: "Left" },
    { key: "right", value: "right", text: "Right" },
    { key: "short", value: "short", text: "Short" },
];
const driveOptionsPar3 = [
    { key: "green", value: "green", text: "Green" },
    { key: "long", value: "long", text: "Long" },
    { key: "left", value: "left", text: "Left" },
    { key: "right", value: "right", text: "Right" },
    { key: "short", value: "short", text: "Short" },
];

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
                    style={{ width: "70px" }}
                />
            </div>
        </div>
    );

    renderSelect = field => (
        <div>
            <div>
                <Dropdown
                    {...field.input}
                    fluid
                    selection
                    placeholder={field.label}
                    options={field.options}
                    loading={field.loading}
                    disabled={field.index === 0}
                    onChange={(e, { value }) => {
                        e.preventDefault();
                        field.input.onChange(value);
                    }}
                />
            </div>
        </div>
    );

    renderStrokes = ({ fields, meta, players, holes }) => (
        <div style={{ display: "flex" }}>
            <List style={{ display: "flex", justifyContent: "center", marginTop: "30px", marginLeft: "30px", width: "600px" }}>
                <div>
                    {fields.map((golfhole, index) => (
                        <Segment.Group raised compact>
                            <List.Item key={index}>
                                <Segment attached="top" color="grey" inverted style={{ border: "none", textAlign: "center" }}>

                                    {/* {/* The actual score grid */}
                                    <Grid style={{ fontSize: "20px", fontWeight: "bold" }}>
                                        <Grid.Row columns={3}>
                                            <Grid.Column>
                                                Hole: {holes[index].number}
                                            </Grid.Column>
                                            <Grid.Column>
                                                Par: {holes[index].par}
                                            </Grid.Column>
                                            <Grid.Column>
                                                Index: {holes[index].index}
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                    {/* First row */}
                                </Segment>
                                <Table as={Segment} attached="bottom" textAlign="center" style={{ margin: "auto", border: "none" }}>
                                    <Table.Row>
                                        <Table.Cell style={{ background: "#f2711c", color: "white", fontWeight: "bold" }}>
                                            Player
                                            </Table.Cell>
                                        <Table.Cell style={{ display: "flex", justifyContent: "center" }}>
                                            Strokes<p style={{ margin: 0, color: "red" }}>*</p>
                                        </Table.Cell>
                                        <Table.Cell>
                                            Putts
                                        </Table.Cell>
                                        <Table.Cell>
                                            Drive
                                        </Table.Cell>
                                        <Table.Cell>
                                            Chips
                                        </Table.Cell>
                                        <Table.Cell>
                                            Penalties
                                        </Table.Cell>
                                    </Table.Row>
                                    {/* Second Row */}
                                    {players.map(player => (
                                        <Table.Row>
                                            <Table.Cell style={{ background: "#f2711c", color: "white", fontWeight: "bold" }}>
                                                {player.playerName}
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Field
                                                    name={`${golfhole}.${player.playerName}.score`}
                                                    type="number"
                                                    component={this.renderInput}
                                                    error={meta.error && meta.error[index] && meta.error[index].length && meta.error[index]}
                                                    onChange
                                                />
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Field
                                                    name={`${golfhole}.${player.playerName}.putts`}
                                                    type="number"
                                                    component={this.renderInput}
                                                />
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Field
                                                    name={`${golfhole}.${player.playerName}.drive`}
                                                    component={this.renderSelect}
                                                    options={holes[index].par === 3 ? driveOptionsPar3 : driveOptions}
                                                    label="Drive"
                                                />
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Field
                                                    name={`${golfhole}.${player.playerName}.chips`}
                                                    component={this.renderInput}
                                                    type="number"
                                                />
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Field
                                                    name={`${golfhole}.${player.playerName}.penalties`}
                                                    component={this.renderInput}
                                                    type="number"
                                                />
                                            </Table.Cell>

                                        </Table.Row>
                                    ))}
                                    {/* Putts */}
                                </Table>
                            </List.Item>
                        </Segment.Group>
                    ))}
                </div>
            </List>
        </div>
    )

    render() {
        const { golfplayers, golfclubdata } = this.props;
        const holes = sortBy(golfclubdata, "number");
        return (
            <div>
                <Label ribbon size="huge" color="orange">How did it go?</Label>
                <FieldArray name="golfscores" component={this.renderStrokes} holes={holes} players={golfplayers} />
            </div>
        );
    }
}

StepFour.propTypes = {
    dispatch: PropTypes.func.isRequired,
    golfclubdata: PropTypes.arrayOf(PropTypes.object),
    golfplayers: PropTypes.arrayOf(PropTypes.object),
    golfscores: PropTypes.arrayOf(PropTypes.object),
}

StepFour.defaultProps = {
    golfclubdata: [],
    golfplayers: [],
    golfscores: [],
}

const selector = formValueSelector('createGolfRound');
StepFour = connect(state => {
    const golfplayers = selector(state, "golfplayers");
    const golfscores = selector(state, "golfscores");
    return {
        golfplayers,
        golfscores,
        user: state.user,
        golfclubdata: state.golfclub.items
    }
})(StepFour)

export default StepFour;