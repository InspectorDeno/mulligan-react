import React, { Component } from 'react';
import { Field, FieldArray, formValueSelector } from "redux-form";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { findWhere, without, contains } from "underscore";
import { List, Dropdown, Button, Form, Divider, Message, Segment, Icon, Label } from 'semantic-ui-react';
import InlineError from "../messages/InlineError"
import { getFriends } from "../../actions/users";

// Class component

const golfTeesOptions = [
    { key: "white", value: "White", text: "White", label: { empty: true, circular: true } },
    { key: "yellow", value: "Yellow", text: "Yellow", label: { color: "yellow", empty: true, circular: true } },
    { key: "blue", value: "Blue", text: "Blue", label: { color: "blue", empty: true, circular: true } },
    { key: "red", value: "Red", text: "Red", label: { color: "red", empty: true, circular: true } }
];
const genderOptions = [
    { key: "male", value: "male", text: "Male" },
    { key: "female", value: "female", text: "Female" },
];
const hcpRoundOptions = [
    { key: "yes", value: true, text: "Yes" },
    { key: "no", value: false, text: "No" },
];

class StepThree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            players: [],
            values: []
        };
    }

    componentDidMount() {
        // Only try to fetch data if we don't have it
        if (!this.props.friendData.length) {
            this.props.dispatch(getFriends());
        }
    }

    // Kallas från multiselectorn när vi lägger till eller tar bort (lilla xet)
    handleChange = (data, fields) => {
        const friendPlayers = [];
        data.value.forEach(user => {
            const theFriend = findWhere(this.props.friendData, { username: user });
            const player = {
                playerName: theFriend.username,
                playerHcp: theFriend.hcp,
                playerGender: theFriend.gender,
                playerTee: theFriend.gender === "male" ? "Yellow" : "Red",
                hcpRound: false
            }
            friendPlayers.push(player);

            if (friendPlayers.length > this.state.values.length) {
                // console.log("Lagt till vän");
                fields.push(player);
            }
        });
        this.setState({ values: data.value, players: friendPlayers });
    }

    // For determining whether to update the friends dropdown when a player is removed
    removeFriend = removedPlayer => {
        const { values } = this.state;
        if (removedPlayer.playerName) {
            if (contains(values, removedPlayer.playerName)) {
                this.setState({ values: without(values, removedPlayer.playerName) });
            }
        }
    }

    renderInput = ({ input, label, type, meta, index }) => (
        <div>
            {/* {<p>{JSON.stringify(meta, 2, 0)}</p>} */}
            <label htmlFor={input.name}><b>{label}</b></label>
            {meta.touched && meta.error && <InlineError text={meta.error} />}
            <div>
                <Form.Input
                    {...input}
                    type={type}
                    placeholder={label}
                    disabled={index === 0}
                    style={{ width: "100%" }} />
            </div>
        </div>
    )

    renderSelect = ({ input, label, options, meta, index }) => (
        <div>
            <label htmlFor={input.name}><b>{label}</b></label>
            {meta.touched && meta.error && <InlineError text={meta.error} />}
            <div>
                <Dropdown
                    {...input}
                    fluid
                    floating
                    selection
                    disabled={index === 0}
                    placeholder={label}
                    options={options}
                    onChange={(e, { value }) => {
                        e.preventDefault();
                        input.onChange(value);
                    }}
                />
            </div>
        </div>
    )

    // Friends Select Dropdown
    renderFriendsSelect = ({ input, label, options, loading }) => {
        const { values } = this.state;
        return (
            <div>
                <div>
                    <Dropdown
                        className="icon"
                        button
                        labeled
                        multiple
                        closeOnChange
                        value={values}
                        text={label}
                        options={options}
                        loading={loading}
                        onChange={(e, data) => {
                            input.onChange((data));
                        }}
                        style={{
                            marginRight: "10px",
                            fontSize: "1.2em"
                        }}
                    />
                </div>
            </div>
        )
    };

    renderPlayers = ({ fields, meta, friends }) => (
        <List style={{ maxWidth: "100%" }}>
            <List.Item>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                    <Field
                        name={`friendPlayers`}
                        component={this.renderFriendsSelect}
                        options={friends.map(friend => ({
                            value: friend.username,
                            key: friend.username,
                            text: friend.username
                        }))}
                        label="Add Friend"
                        onChange={data => {
                            this.handleChange(data, fields);
                        }}
                    />
                    <Button
                        icon
                        size="large"
                        labelPosition="left"
                        type="button"
                        onClick={() => {
                            fields.push({})
                        }}
                        style={{ marginLeft: "10px" }}
                    ><Icon name="plus" /
                        >Add New Player
                        </Button>
                    {/* {meta.error && <InlineError text={meta.error} style={{ float: "right" }} />} */}
                </div>
            </List.Item>
            {meta.error && <Message size="small" negative header={meta.error} />}
            <Divider />
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                {fields.map((player, index) => (
                    <Segment compact style={{ margin: "10px" }}>
                        <List.Item key={index} style={{ width: "180px" }}>
                            <div style={{ display: "inline-block", width: "100%" }}>
                                <div style={{ fontSize: "20px", fontWeight: "bold", float: "left" }}>Player {index + 1}</div>
                                <Button
                                    size="mini"
                                    inverted
                                    color="red"
                                    type="button"
                                    icon="remove"
                                    floated="right"
                                    disabled={index === 0}
                                    onClick={() => {
                                        this.removeFriend(fields.get(index));
                                        fields.remove(index);
                                    }}
                                    style={{ margin: 0 }}
                                />
                            </div>
                            <Divider style={{ margin: 0 }} />
                            <Field
                                name={`${player}.playerName`}
                                type="text"
                                component={this.renderInput}
                                label="Name"
                                index={index}
                            />
                            <Field
                                name={`${player}.playerHcp`}
                                type="text"
                                component={this.renderInput}
                                label="HCP"
                                index={index}
                            />
                            <Field
                                name={`${player}.playerGender`}
                                component={this.renderSelect}
                                options={genderOptions}
                                label="Gender"
                                index={index}
                            />
                            <Field
                                name={`${player}.playerTee`}
                                component={this.renderSelect}
                                options={golfTeesOptions}
                                label="Tee"
                            />
                            <Field
                                name={`${player}.hcpRound`}
                                component={this.renderSelect}
                                options={hcpRoundOptions}
                                label="Handicap Round?"
                            />
                        </List.Item>
                    </Segment>
                ))}
            </div>
        </List>
    )

    render() {
        const { friendData } = this.props;
        const { values } = this.state;
        return (
            <div>
                <Label ribbon size="huge" color="purple">Who played?</Label>
                <FieldArray name="golfplayers" component={this.renderPlayers} friends={friendData} values={values} />
            </div>
        );
    }
};

StepThree.propTypes = {
    dispatch: PropTypes.func.isRequired,
    friendData: PropTypes.arrayOf(PropTypes.object)
}

StepThree.defaultProps = {
    friendData: []
}

const selector = formValueSelector('createGolfRound')
function mapStateToProps(state) {
    return {
        friendData: state.user.friends,
        submittedPlayers: selector(state, "golfplayers")
    };
}

export default connect(mapStateToProps)(StepThree);

